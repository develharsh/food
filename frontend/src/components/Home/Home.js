import "./Home.css";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Box>
        <Image src="/slides/homebanner.jpg" alt="..." />
      </Box>
      <div className="feature1">
        <p className="homeOutPara1">BEYOND IMMUNITY BOOSTERS</p>
        <p className="homeOutPara2">EAT HEALTHY &amp; BOOST IMMUNITY</p>
        <div className="home2ndDiv">
          <div className="homeF1SMImgDiv">
            <Image
              src="/tiles/feature1Img1.png"
              alt="..."
              w="120px"
              ml="13px"
            />
            <p>
              <span>Healthy Ingredients</span>
              <br></br>
              <br></br>Natural, Chemical-free, healthy Ingredients
            </p>
          </div>
          <div className="homeF1SMImgDiv">
            <Image
              src="/tiles/feature1Img2.png"
              alt="..."
              w="120px"
              ml="13px"
            />
            <p>
              <span>Optimum Nutrition</span>
              <br></br>
              <br></br>Based on Dr. Greger's Daily Dozen Checklist
            </p>
          </div>
          <div>
            <Image
              src="/tiles/feature1Img3.png"
              alt="..."
              mt={[5, 5, 0, 0, 0]}
            />
          </div>
        </div>
      </div>
      <div className="feature2">
        <p>Why Tiffin Service From Tiff.in?</p>
        <div className="homeF2Para">
          <div>
            <Image src="/tiles/f2img1.png" alt="..." w="120px" ml="13px" />
            <p>New Items everyday with incredible taste.</p>
          </div>
          <div>
            <Image src="/tiles/f2img2.png" alt="..." w="120px" ml="13px" />
            <p>Door delivery across Gurgaon</p>
          </div>
          <div>
            <Image src="/tiles/f2img3.png" alt="..." w="120px" ml="13px" />
            <p>Choose delivery time from lunch or dinner or both</p>
          </div>
          <div>
            <Image src="/tiles/f2img4.png" alt="..." w="120px" ml="13px" />
            <p>Zero Packaging Fees. Delivered in sanitised tiffin boxes</p>
          </div>
        </div>
        <div className="dFlex justfycent">
          <Link to="/today">
            <Button className="homeOrderBtn">
              Order Your Everyday Healthy Meal
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
