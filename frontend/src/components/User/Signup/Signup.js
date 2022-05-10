import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Image,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { MdAppRegistration, MdDomainVerification } from "react-icons/md";
import "./Signup.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, clearErrors, clearMessages } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, message } = useSelector((state) => state.user);
  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
      dispatch(clearErrors());
    }
    if (user) {
      if (message) {
        toast({
          title: message,
          status: "success",
          isClosable: true,
        });
        dispatch(clearMessages());
      }
      navigate("/");
    }
  }, [dispatch, user, message, error, navigate, toast]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Client",
  });
  const { name, email, phone, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(signup(values));
  };
  return (
    <>
      <Flex className="SignupFlex" mt={[10, 10, 10, 10, 53]}>
        <Box>
          <Image
            w={[300, 300, 400, 500, 500]}
            src="/tiles/signupBg.png"
            alt="..."
          />
        </Box>
        <Box mt={[0, 1, 10, 20, 53]} className="SignupBox">
          <FormControl w={[300, 300, 300, 300, 400]} isRequired>
            <FormLabel htmlFor="s">Your Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl w={[300, 300, 300, 300, 400]} isRequired>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl w={[300, 300, 300, 300, 400]} isRequired>
            <FormLabel htmlFor="phone">Your Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl w={[300, 300, 300, 300, 400]} isRequired>
            <FormLabel htmlFor="password">Your Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </FormControl>

          <Stack
            direction="row"
            spacing={4}
            mt="3"
            ml={[-1, -1, -1, -1, "40px"]}
          >
            <Button
              leftIcon={<MdAppRegistration />}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Link to="/login">
              <Button leftIcon={<MdDomainVerification />} colorScheme="pink">
                Already a User?
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
