import { FC } from "react";

import { Card, CardContent, CardMedia, Collapse, Typography } from "@mui/material";

interface IContent {
  imageURL: string;
  imageAlt: string;
  title: string;
  description: string;
  time: number;
}

interface IImageCardProps {
  content: IContent;
  checked: boolean;
}

const ImageCard:FC<IImageCardProps> = ({content, checked}) => {
  return (
    <Collapse in={checked} {...(checked ? { timeout: 2000 } : {})}>
      <Card
        sx={{
          maxWidth: 745,
          background: "rgba(0,0,0,0.3)",
          margin: "20px",
          borderRadius: "5%",
        }}
      >
        <CardMedia
          component="img"
          height="500"
          image={content.imageURL}
          alt={content.imageAlt}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={{
              fontFamily: "Nunito",
              fontWeight: "bold",
              fontSize: "2rem",
              color: "white",
            }}
          >
            {content.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "Nunito",
              fontSize: "1.3rem",
              color: "white",
            }}
          >
            {content.description}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default ImageCard;
