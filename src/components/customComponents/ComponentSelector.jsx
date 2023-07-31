import { useDispatch, useSelector } from "react-redux";
import {
  API_BUTTON,
  AUTO_FETCH_API,
  CONTAINER,
  DETAILED_VIEW,
  DYNAMIC_CARD_CONTAINER,
  GET,
  HEADING,
  IMAGE_BANNER,
  NAVIGATE_BUTTON,
  PAGE_FOOTER,
  SELECT,
  SLIDER,
  HAMBURGER_MENU,
  SELECT_SLIDER,
  API_HEADING,
  TOGGLE_BUTTON,
  SCROLL_TO_TOP,
} from "../utils/Const";
import Banner from "./Banner";
import Footer from "./Footer";
import Slider from "./Slider";
import Heading from "./Heading";
import ApiButton from "./ApiButton";
import MenuState from "./MenupState";
import DetailCard from "./DetailedCard";
import DynamicHeading from "./ApiHeading";
import SelectButton from "./SelectButton";
import AutoFetchApi from "./AutoFetchApi";
import NavigateButton from "./NavigateButton";
import { SelectSlider } from "./SelectSlider";
import RenderComponent from "./ComponentRenderer";
import DynamicCardContainer from "./DynamicCardContainer";
import { storeFilterData } from "../../redux/slice/filterSlice";
import { callApi } from "../../redux/utils/apiActions";
import { ToggleButton } from "react-bootstrap";
import { display } from "@mui/system";
import { ScrollToTop } from "./ScrollToTop";
import DetailDataCard from "./DetailedDataCard";

const ComponentSelector = ({ component }) => {
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state[component.sliceName]);

  const handleValueChange = (value) => {
    dispatch(
      storeFilterData({
        key: component.paginatioName || component.name,
        value: value,
      })
    );
    if (component.onClickApi) {
      const options = {
        url: component.onClickApi,
        method: component.onClickApiMethod,
        headers: { "Content-Type": "application/json" },
        data: {
          ...sliceData,
          [component.paginatioName || component.name]: value,
        },
      };
      dispatch(callApi(options));
    }
  };
  return (
    <>
      {component.type === AUTO_FETCH_API && (
        <AutoFetchApi url={component.api} method={GET} />
      )}
      {component.type === CONTAINER && (
        <RenderComponent jsonToRender={component} />
      )}
      {component.type === IMAGE_BANNER && (
        <Banner
          text={component.text}
          bgImage={component.bgImage}
          className={component.className}
        />
      )}
      {component.type === SELECT && (
        <SelectButton
          name={component.name}
          options={component.options}
          defaultValue={component.defaultValue}
          handleValueChange={handleValueChange}
          label={component.label}
          value={sliceData[component.name]}
        />
      )}
      {component.type === SLIDER && (
        <Slider
          component={component}
          handleValueChange={handleValueChange}
          value={sliceData[component.name]}
        />
      )}
      {component.type === API_BUTTON && (
        <ApiButton
          apiType={component.apiType}
          api={component.api}
          buttonLabel={component.buttonLabel}
          navigate={component.navigate}
          data={sliceData}
        />
      )}
      {component.type === HEADING && <Heading component={component} />}
      {component.type === API_HEADING && (
        <DynamicHeading component={component} />
      )}
      {component.type === DYNAMIC_CARD_CONTAINER && (
        <DynamicCardContainer
          component={component}
          handleValueChange={handleValueChange}
        />
      )}
      {component.type === DETAILED_VIEW && (
        // <DetailCard apiName={component.apiName} />
        <DetailDataCard apiName={component.apiName} />
      )}
      {component.type === NAVIGATE_BUTTON && (
        <NavigateButton to={component.navigate} label={component.buttonLabel} />
      )}
      {component.type === PAGE_FOOTER && <Footer component={component} />}
      {component.type === HAMBURGER_MENU && (
        <MenuState MenuItems={component.items} />
      )}
      {component.type === SELECT_SLIDER && (
        <SelectSlider
          component={component}
          handleValueChange={handleValueChange}
          stateValue={sliceData[component.name]}
        />
      )}
      {component.type === TOGGLE_BUTTON && (
        <ToggleButton
          component={component}
          handleValueChange={(value) => {
            display(storeFilterData({ key: component.name, value: value }));
          }}
        />
      )}
      {component.type === SCROLL_TO_TOP && (
        <ScrollToTop component={component} />
      )}
    </>
  );
};
export default ComponentSelector;
