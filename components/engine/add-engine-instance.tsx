import {
  useAccount,
  useCreateBillingSession,
} from "@3rdweb-sdk/react/hooks/useApi";
import {
  Flex,
  FormControl,
  Icon,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  UnorderedList,
  UseDisclosureReturn,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { THIRDWEB_API_HOST } from "constants/urls";
import { useTrack } from "hooks/analytics/useTrack";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiRocket } from "react-icons/bi";
import { BsCloudCheck, BsGear } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import {
  Text,
  Heading,
  Button,
  Badge,
  FormLabel,
  FormHelperText,
  Link,
} from "tw-components";

interface AddEngineInstanceButtonProps {
  refetch: () => void;
}

type ModalState =
  | "selectHostingOption"
  | "importEngine"
  | "addCloudHosted"
  | "addPaymentMethod"
  | "completeCloudHosted";

export const AddEngineInstanceButton = ({
  refetch,
}: AddEngineInstanceButtonProps) => {
  const disclosure = useDisclosure();
  const trackEvent = useTrack();

  return (
    <>
      <Button
        onClick={() => {
          trackEvent({
            category: "engine",
            action: "click",
            label: "add-engine-instance",
          });
          disclosure.onOpen();
        }}
        colorScheme="blue"
        leftIcon={<Icon as={FiPlus} boxSize={4} />}
        w="fit-content"
      >
        Add Engine Instance
      </Button>

      {disclosure.isOpen && (
        <ModalBase disclosure={disclosure} refetch={refetch} />
      )}
    </>
  );
};

const ModalBase = ({
  disclosure,
  refetch,
}: {
  disclosure: UseDisclosureReturn;
  refetch: () => void;
}) => {
  const [modalState, setModalState] = useState<ModalState>(
    "selectHostingOption",
  );

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size="lg"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        {modalState === "selectHostingOption" ? (
          <ModalSelectHostingOption setModalState={setModalState} />
        ) : modalState === "importEngine" ? (
          <ModalImportEngine
            setModalState={setModalState}
            onSuccess={() => {
              disclosure.onClose();
              refetch();
            }}
          />
        ) : modalState === "addCloudHosted" ? (
          <ModalAddCloudHosted setModalState={setModalState} />
        ) : modalState === "completeCloudHosted" ? (
          <ModalCompleteCloudHosted
            onSuccess={() => {
              disclosure.onClose();
              refetch();
            }}
          />
        ) : modalState === "addPaymentMethod" ? (
          <ModalAddPayment setModalState={setModalState} />
        ) : null}
      </ModalContent>
    </Modal>
  );
};

const ModalSelectHostingOption = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
}) => {
  const trackEvent = useTrack();
  const meQuery = useAccount();

  const onClickCloudHosted = () => {
    if (meQuery.isLoading) {
      return;
    }

    const hasPaymentMethod = meQuery.data?.status === "validPayment";
    setModalState(hasPaymentMethod ? "addCloudHosted" : "addPaymentMethod");
  };

  const onClickSelfHosted = () => {
    trackEvent({
      category: "engine",
      action: "click",
      label: "clicked-self-host-instructions",
    });
    window.open("https://portal.thirdweb.com/engine/getting-started");
  };

  const onClickImport = () => {
    trackEvent({
      category: "engine",
      action: "import",
      label: "open-modal",
    });
    setModalState("importEngine");
  };

  return (
    <>
      <ModalHeader>Add Engine Instance</ModalHeader>
      <ModalBody>
        <Stack spacing={4}>
          {/* Cloud-hosted */}
          <Button
            onClick={onClickCloudHosted}
            variant="outline"
            px={8}
            py={16}
            rounded="xl"
            _hover={{
              borderColor: "blue.500",
            }}
            transitionDuration="200ms"
            justifyContent="flex-start"
          >
            <Stack spacing={4}>
              <Flex gap={2} align="center">
                <Icon as={BsCloudCheck} />
                <Heading size="title.xs">Cloud-host</Heading>
                <Badge
                  variant="outline"
                  w="fit-content"
                  colorScheme="gray"
                  rounded="md"
                  size="label.sm"
                >
                  $99 / month
                </Badge>
              </Flex>
              <Text textAlign="left">
                Host Engine on thirdweb with no setup.
              </Text>
            </Stack>
          </Button>

          {/* Self-hosted */}
          <Button
            onClick={onClickSelfHosted}
            variant="outline"
            px={8}
            py={16}
            rounded="xl"
            _hover={{
              borderColor: "blue.500",
            }}
            transitionDuration="200ms"
            justifyContent="flex-start"
          >
            <Stack spacing={4}>
              <Flex gap={2} align="center">
                <Icon as={BsGear} />
                <Heading size="title.xs">Self-host</Heading>
                <Badge
                  variant="outline"
                  w="fit-content"
                  colorScheme="gray"
                  rounded="md"
                  size="label.sm"
                >
                  Free
                </Badge>
              </Flex>
              <Text textAlign="left">
                Host Engine on your infrastructure with minimal setup.
              </Text>
            </Stack>
          </Button>

          <Text>
            Or{" "}
            <Button
              variant="link"
              onClick={onClickImport}
              color="blue.500"
              size="sm"
            >
              import your existing Engine instance
            </Button>
            .
          </Text>
        </Stack>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

const ModalImportEngine = ({
  setModalState,
  onSuccess,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
  onSuccess: () => void;
}) => {
  const toast = useToast();

  const form = useForm({
    defaultValues: {
      name: "Untitled Engine Instance",
      url: "",
    },
  });

  const onSubmit = async (data: { name: string; url: string }) => {
    try {
      // Instance URLs should end with a /.
      const url = data.url.endsWith("/") ? data.url : `${data.url}/`;

      const res = await fetch(`${THIRDWEB_API_HOST}/v1/engine`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          url,
        }),
      });
      if (!res.ok) {
        throw new Error(`Unexpected status ${res.status}`);
      }

      onSuccess();
    } catch (e) {
      toast({
        status: "error",
        description:
          "Error importing Engine. Please check if the details are correct.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ModalHeader>Import Engine Instance</ModalHeader>

      <ModalBody>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter a descriptive label"
              autoFocus
              {...form.register("name")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>URL</FormLabel>
            <Input
              type="url"
              placeholder="Enter your Engine URL"
              {...form.register("url")}
            />
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter as={Flex} gap={3}>
        <Button
          onClick={() => setModalState("selectHostingOption")}
          variant="ghost"
        >
          Back
        </Button>
        <Button type="submit" colorScheme="primary">
          Import
        </Button>
      </ModalFooter>
    </form>
  );
};

const ModalAddPayment = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
}) => {
  const trackEvent = useTrack();
  const createBillingSessionMutation = useCreateBillingSession();

  return (
    <>
      <ModalHeader>Deploy a Cloud-Hosted Engine</ModalHeader>
      <ModalBody>
        <Text>Please add a payment method to continue.</Text>
      </ModalBody>

      <ModalFooter as={Flex} gap={3}>
        <Button
          onClick={() => setModalState("selectHostingOption")}
          variant="ghost"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            trackEvent({
              category: "engine",
              action: "click",
              label: "add-payment-method",
            });
            createBillingSessionMutation.mutate(undefined, {
              onSuccess: (data) => window.open(data.url),
            });
          }}
          colorScheme="primary"
        >
          Add Payment Method
        </Button>
      </ModalFooter>
    </>
  );
};

const ModalAddCloudHosted = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
}) => {
  const toast = useToast();
  const trackEvent = useTrack();
  const form = useForm({
    defaultValues: {
      secretKey: "",
    },
  });

  const onSubmit = async (data: { secretKey: string }) => {
    trackEvent({
      category: "engine",
      action: "click",
      label: "deploy-cloud-hosted",
    });

    try {
      const res = await fetch(`${THIRDWEB_API_HOST}/v1/engine/deploy`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Unexpected status ${res.status}`);
      }

      setModalState("completeCloudHosted");
    } catch (e) {
      console.error(`Error deploying Engine: ${e}`);
      toast({
        status: "error",
        description: "Error deploying Engine.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ModalHeader>Deploy a Cloud-Hosted Engine</ModalHeader>

      <ModalBody>
        <Stack spacing={8}>
          <FormControl isRequired>
            <FormLabel>Secret Key</FormLabel>
            <Input
              type="text"
              placeholder="Your thirdweb secret key"
              autoFocus
              {...form.register("secretKey", { required: true })}
            />
            <FormHelperText>
              <Link
                href="/dashboard/settings/api-keys"
                isExternal
                color="blue.500"
              >
                Create an API key
              </Link>{" "}
              to allow Engine to access thirdweb infrastructure.
            </FormHelperText>
          </FormControl>

          <Flex justify="space-between">
            <Text>Cloud-hosted Engine</Text>
            <Text>$99 / month</Text>
          </Flex>
        </Stack>
      </ModalBody>

      <ModalFooter as={Flex} gap={3}>
        <Button
          onClick={() => setModalState("selectHostingOption")}
          variant="ghost"
        >
          Back
        </Button>
        <Button type="submit" colorScheme="primary" leftIcon={<BiRocket />}>
          Deploy
        </Button>
      </ModalFooter>
    </form>
  );
};

const ModalCompleteCloudHosted = ({ onSuccess }: { onSuccess: () => void }) => {
  const meQuery = useAccount();

  return (
    <>
      <ModalHeader>Deploy a Cloud-Hosted Engine</ModalHeader>

      <ModalBody>
        <Stack>
          <Text>Your Engine instance is being deployed!</Text>
          <Text>
            This can take up to 10 minutes. An email will be sent to{" "}
            <strong>{meQuery.data?.email}</strong> when the deployment is
            complete.
          </Text>

          <Text mt={4}>Helpful resources:</Text>
          <UnorderedList>
            <ListItem>
              <Text>
                <Link
                  href="https://portal.thirdweb.com/engine/backend-wallets"
                  isExternal
                  color="blue.500"
                >
                  Create backend wallets
                </Link>
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Link
                  href="https://portal.thirdweb.com/engine/authentication"
                  isExternal
                  color="blue.500"
                >
                  Add admin users
                </Link>
              </Text>
            </ListItem>
          </UnorderedList>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onSuccess} colorScheme="primary">
          Done
        </Button>
      </ModalFooter>
    </>
  );
};
