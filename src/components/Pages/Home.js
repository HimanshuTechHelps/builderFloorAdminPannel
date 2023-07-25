import React from "react";

import { Card } from "react-bootstrap";
import { HOME_SCREEN } from "../../ScreenJson";
import RenderComponent from "../customComponents/ComponentRenderer";
import MenupState from "../customComponents/MenupState";
import { MenuItems } from "../../ScreenJson";

export default function Home() {
  return (
    <>
      <MenupState MenuItems={MenuItems} />
      <Card className="home-screen">
        <RenderComponent jsonToRender={HOME_SCREEN} />
      </Card>
    </>
  );
}
