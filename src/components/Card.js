import { useQuery } from "react-query";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import "./Card.css";

import "./Card.css";

export default function CardComponent() {
  const [image, setImage] = useState(null);
  const [flip, setFlip] = useState(false);
  const [description, setDescription] = useState("");
  // const [error, setError] = useState(null);
  const randomNumber = () => {
    // console.log(Math.floor(Math.random() * 50));
    return Math.floor(Math.random() * 50);
  };

  // `https://api.slingacademy.com/v1/sample-data/photos/${randomNumber()}`
  const fetchData = () => {
    fetch(
      `https://api.slingacademy.com/v1/sample-data/photos/${randomNumber()}`
    )
      .then((response) => {
        console.log(response);
        const jsonResponse = response.json();
        return jsonResponse;
      })
      .then((data) => {
        setImage(data.photo.url);
        return data;
      })
      .then((data) => setDescription(data.photo.description))
      .catch((err) => console.log(err.message));
  };

  const { isLoading, isError, error } = useQuery("image-data", fetchData);

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  const mouseAction = () => {
    setFlip(!flip);
    console.log("clicked");
    console.log(description);
  };

  return (
    // <Grid item justifycontent="center" alignitems="center">
    //   <div>
    //     <h1> Card here</h1>
    //     <Grid className={`card ${flip ? "flipped" : ""}`} onClick={mouseHover}>
    //       <Card className="innerCard">
    //         {/* //Front Image card */}
    //         <CardMedia
    //           className="frontImage"
    //           image={image}
    //           alt=""
    //           component="img"
    //         ></CardMedia>

    //         {/* //Back description card */}
    //         <Card className="backDescription ">
    //           <CardContent>
    //             <Typography gutterBottom variant="h5" component="div">
    //               {description}
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </Card>
    //     </Grid>
    //   </div>
    // </Grid>

    <div classname="outerGrid">
      <div className={`card ${flip ? "flipped" : ""}`} onClick={mouseAction}>
        <div className="innerCard">
          <CardMedia className="frontImage" image={image} />

          <div className="backDescription">
            <div gutterBottom variant="h5" component="div">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
