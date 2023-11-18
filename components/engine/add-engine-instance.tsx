import {
  Divider,
  Flex,
  FormControl,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { OnboardingPaymentForm } from "components/onboarding/PaymentForm";
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
  Card,
} from "tw-components";
import { stripePaymentElementAppearance } from "components/onboarding/Billing";

// DEBUG: DO NOT MERGE
const CARD_ONLY_PAYMENT_METHOD_CFG_ID = "pmc_1ODIWMCQUO4TBFqFLC3qxXxg";

interface AddEngineInstanceButtonProps {
  refetch: () => void;
}

type ModalState = "selectHostingOption" | "importEngine" | "addCloudHosted";

export const AddEngineInstanceButton = ({
  refetch,
}: AddEngineInstanceButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const trackEvent = useTrack();

  const [modalState, setModalState] = useState<ModalState>(
    "selectHostingOption",
  );

  const content =
    modalState === "selectHostingOption" ? (
      <ModalSelectHostingOption setModalState={setModalState} />
    ) : modalState === "importEngine" ? (
      <ModalImportEngine
        setModalState={setModalState}
        onSuccess={() => {
          onClose();
          refetch();
        }}
      />
    ) : modalState === "addCloudHosted" ? (
      <ModalAddCloudHosted
        setModalState={setModalState}
        onSuccess={() => {
          onClose();
          refetch();
        }}
      />
    ) : null;

  return (
    <>
      <Button
        onClick={() => {
          trackEvent({
            category: "engine",
            action: "click",
            label: "add-engine-instance",
          });
          onOpen();
        }}
        colorScheme="blue"
        leftIcon={<Icon as={FiPlus} boxSize={4} />}
        w="fit-content"
      >
        Add Engine Instance
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {content}
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalSelectHostingOption = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
}) => {
  const trackEvent = useTrack();

  const onClickCloudHosted = () => {
    setModalState("addCloudHosted");
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

const ModalAddCloudHosted = ({
  setModalState,
  onSuccess,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
  onSuccess: () => void;
}) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [stripePromise, setStripePromise] = useState<
    Promise<Stripe | null> | undefined
  >();
  const form = useForm({
    defaultValues: {
      secretKey: "",
    },
  });

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STRIPE_KEY) {
      (async () => {
        setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? ""));
      })();
    }
  }, []);

  const onSubmit = async (data: { secretKey: string }) => {};

  const onPaymentSave = () => {};
  const onPaymentCancel = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ModalHeader>Add a Cloud-Hosted Engine</ModalHeader>

      <ModalBody>
        <Stack spacing={8}>
          <FormControl isRequired>
            <FormLabel>Secret Key</FormLabel>
            <Input
              type="text"
              placeholder="Your thirdweb secret key"
              autoFocus
              {...form.register("secretKey")}
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

          {/* Payment */}
          {/* {stripePromise && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "setup",
                paymentMethodCreation: "manual",
                currency: "usd",
                paymentMethodConfiguration: CARD_ONLY_PAYMENT_METHOD_CFG_ID,
                appearance: {
                  theme: colorMode === "dark" ? "night" : "stripe",
                  ...stripePaymentElementAppearance,
                },
              }}
            >
              <OnboardingPaymentForm
                onSave={onPaymentSave}
                onCancel={onPaymentCancel}
              />
            </Elements>
          )} */}

          {/* Price summary */}
          {/* <Stack>
            <Flex justify="space-between">
              <Text>Cloud-hosted Engine</Text>
              <Text>$99 / month</Text>
            </Flex>
            <Divider />
            <Flex justify="space-between">
              <Text fontWeight="bold">Total</Text>
              <Text fontWeight="bold">$99 / month</Text>
            </Flex>
          </Stack> */}
          <Stack>
            <Flex justify="space-between" align="baseline">
              <Text>Payment Method</Text>
              <Link href="#" color="blue.500" fontSize="14px">
                Add a payment to continue
              </Link>
            </Flex>
            <Flex justify="space-between">
              <Text>Cloud-hosted Engine</Text>
              <Text>$99 / month</Text>
            </Flex>
          </Stack>
        </Stack>
      </ModalBody>

      <ModalFooter as={Flex} gap={3}>
        <Button
          onClick={() => setModalState("selectHostingOption")}
          variant="ghost"
        >
          Back
        </Button>
        <Button
          type="submit"
          colorScheme="primary"
          leftIcon={<BiRocket />}
          isDisabled
        >
          Deploy
        </Button>
      </ModalFooter>
    </form>
  );
};
