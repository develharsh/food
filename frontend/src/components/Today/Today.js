// import { useEffect } from "react";
import { menu } from "../../utils/hardcoded";
import ItemCard from "../ItemCard/ItemCard";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDangerous, MdNextPlan, MdPayment } from "react-icons/md";
import { clearWishlist } from "../../actions/wishlist";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Today = () => {
  //Payment Open
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = { currency: "INR", amount: totalAmt * 100 };

    const options = {
      key: "rzp_live_43gEiC95hG74ZX",
      currency: data.currency,
      amount: data.amount.toString(),
      name: "Alasca Fashion",
      description: wishlist.reduce((ac, v) => ac + " " + v.title, "").trim(),
      handler: function (response) {
        let payload = {
          payment_id: response.razorpay_payment_id,
          userId: user._id,
          items: wishlist.map((item) => {
            return {
              item: item.title,
              price: item.price,
              quantity: item.quantity,
            };
          }),
          address: `${locality} -- ${landmark} -- ${area} -- Gurgaon`,
        };
        console.log(payload);
        modalAddr.onClose();
        setAlert(true);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  //Payment Close
  const dispatch = useDispatch();
  const { wishlist, show_billing_modal } = useSelector(
    (state) => state.wishlist
  );
  const { user } = useSelector((state) => state.user);
  const today = new Date().getDay();
  const [menuList, setMenu] = useState(menu[today]);
  let addressObj = {
    area: "",
    locality: "",
    landmark: "",
  };
  const addCached = localStorage.getItem("addr");
  const [address, setAddress] = useState(
    addCached ? JSON.parse(addCached) : addressObj
  );
  const [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    if (wishlist) {
      if (show_billing_modal) modalBilling.onOpen();
      setTotalAmt(
        wishlist.reduce((ac, v) => {
          return ac + v.quantity * v.price;
        }, 20)
      );
    }
  }, [show_billing_modal, wishlist, totalAmt]);

  const navigate = useNavigate();
  const toast = useToast();

  const modalBilling = useDisclosure(); //{ isOpen, onOpen, onClose }
  const modalAddr = useDisclosure(); //{ isOpen, onOpen, onClose }
  const [orderAlert, setAlert] = useState(false);

  const { area, locality, landmark } = address;
  const handleCheckout = () => {
    displayRazorpay();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = { ...address, [name]: value };
    setAddress(newState);
    localStorage.setItem("addr", JSON.stringify(newState));
  };
  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    window.open("/today", "_self");
  };
  const handleContinue = () => {
    let seenRoti = false,
      seenVeg = false;
    wishlist.forEach((each) => {
      if (each.id === 1) seenRoti = true;
      else if (each.id === 2 || each.id === 3) seenVeg = true;
    });
    if (!seenRoti)
      return toast({
        title: "Tawa Roti is mandatory (तवा रोटी अनिवार्य है)",
        status: "error",
        isClosable: true,
      });
    if (!seenVeg)
      return toast({
        title:
          "Either of the pulse or veg is mandatory (दाल या सब्जी में से कोई एक अनिवार्य है)",
        status: "error",
        isClosable: true,
      });
    if (!user) {
      toast({
        title: "Please Log In OR Sign Up First:)",
        status: "error",
        isClosable: true,
      });
      dispatch({ type: "SHOW_BILLING" });
      navigate("/login?next=/today");
    }
    modalBilling.onClose();
    modalAddr.onOpen();
  };
  return (
    <>
      {orderAlert && (
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Congratulations!</AlertTitle>
            <AlertDescription>
              Your order has been placed. We will be delivering your order
              between 7:00 PM - 8:00 PM today.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setAlert(false)}
          />
        </Alert>
      )}
      <div className="dFlexWrap justfyeven">
        {menuList.map((each, idx) => (
          <ItemCard data={each} key={idx} />
        ))}
      </div>

      <Modal isOpen={modalBilling.isOpen} onClose={modalBilling.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Billing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>Sub-Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {wishlist &&
                    wishlist.map((each, idx) => (
                      <Tr key={idx}>
                        <Td>
                          {each.quantity} X {each.title}
                        </Td>
                        <Td isNumeric>{each.price}</Td>
                        <Td isNumeric>{each.quantity * each.price}</Td>
                      </Tr>
                    ))}
                  <Tr>
                    <Td>Delivery Charge &amp; Other Fees</Td>
                    <Td isNumeric>20</Td>
                    <Td isNumeric>20</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th>Total</Th>
                    <Th isNumeric>₹ {totalAmt}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#e91e63"
              color="#fff"
              mr={3}
              onClick={handleClearWishlist}
              sx={{
                _hover: {
                  bg: "transparent",
                  border: "2px solid #e91e63",
                  color: "#e91e63",
                },
              }}
              leftIcon={<MdDangerous size="20px" />}
            >
              Clear Items
            </Button>
            <Button
              bg="#9c27b0"
              color="#fff"
              leftIcon={<MdNextPlan size="20px" />}
              onClick={handleContinue}
              sx={{
                _hover: {
                  bg: "transparent",
                  border: "2px solid #9c27b0",
                  color: "#9c27b0",
                },
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={modalAddr.isOpen} onClose={modalAddr.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mt={2}>
              <FormLabel>City</FormLabel>
              <Input type="text" readOnly value="Gurgaon" />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Sector/Colony</FormLabel>
              <Input
                type="text"
                name="area"
                value={area}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>H.No./Flat/Floor/Building</FormLabel>
              <Input
                type="text"
                name="locality"
                value={locality}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Landmark(Near Place)</FormLabel>
              <Input
                type="text"
                name="landmark"
                value={landmark}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="tomato"
              color="#fff"
              mr={3}
              onClick={modalAddr.onClose}
              leftIcon={<MdDangerous size="20px" />}
              sx={{
                _hover: {
                  bg: "transparent",
                  color: "tomato",
                  border: "2px solid tomato",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              bg="#283593"
              color="#fff"
              leftIcon={<MdPayment size="20px" />}
              sx={{
                _hover: {
                  bg: "transparent",
                  color: "#283593",
                  border: "2px solid #283593",
                },
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="textCenter">
        <Button
          bg="#3f51b5"
          onClick={modalBilling.onOpen}
          mt="50px"
          color="#fff"
          sx={{
            _hover: {
              color: "#3f51b5",
              bg: "transparent",
              border: "2px solid #3f51b5",
            },
          }}
        >
          Show Billing
        </Button>
      </div>
    </>
  );
};

export default Today;
