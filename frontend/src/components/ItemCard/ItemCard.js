import "./ItemCard.css";
import {
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { removeFromWishlist, updateFromWishlist } from "../../actions/wishlist";
import { useDispatch } from "react-redux";
const ItemCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { value } = e.target;
    const newNum = Number(value);
    if (value === "" || isNaN(newNum) || newNum <= 0) {
      dispatch(removeFromWishlist(data.id));
      //   alert("a");
    } else {
      dispatch(updateFromWishlist(data, value));
      //   alert("b");
    }
  };
  return (
    <>
      <div className="itemCardMainDiv">
        <div className="textCenter">
          <Image
            src={data.preview}
            alt="..."
            w="140px"
            className="itemCardImg"
          />
          <p>{data.title}</p>
          <p>₹ {data.price}</p>
        </div>
        <div>
          <NumberInput min={1} w="140px" ml="5px" mb="5px">
            <NumberInputField placeholder="Quantity" onChange={handleChange} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
