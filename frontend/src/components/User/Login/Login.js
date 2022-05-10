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
import { MdLogin, MdAccessibilityNew } from "react-icons/md";
import "./Login.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErrors, clearMessages } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
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
    ID: "",
    password: "",
  });
  const { ID, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(login(values));
  };
  return (
    <>
      <Flex className="LoginFlex" mt={[10, 10, 10, 10, 53]}>
        <Box>
          <Image
            w={[300, 300, 400, 500, 500]}
            src="/tiles/loginBg.png"
            alt="..."
          />
        </Box>
        <Box mt={[0, 1, 10, 20, 53]} className="LoginBox">
          <FormControl w={[300, 300, 300, 300, 400]} isRequired>
            <FormLabel htmlFor="s">Your Name</FormLabel>
            <Input type="text" name="ID" value={ID} onChange={handleChange} />
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

          <Stack direction="row" spacing={4} mt="3" ml={[4, 5, 5, 5, "60px"]}>
            <Button
              leftIcon={<MdLogin />}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Link to="/signup">
              <Button leftIcon={<MdAccessibilityNew />} colorScheme="pink">
                New User?
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
