import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AnimatedInput from "../../Components/Inputs/AnimatedInput/AnimatedInput";
import {
  HostEaseEvent,
  HostEaseEventForm,
  LatLngLiteral,
  Tag,
  UserContextValue,
} from "../../Types/Types";
import "./NewEvent.css";
import CustomDatePicker from "../../Components/CustomDatePicker/CustomDatePicker";
import Map from "../../Components/Map";
import Selector from "../../Components/Selector";

const NewEvent = () => {
  const userContext = useOutletContext<UserContextValue>();
  const [event, setEvent] = useState<HostEaseEventForm | null>(null);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (data: any, name: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: data,
    }));
  };

  const handleNextTab = () => {
    setCurrentTab(currentTab + 1);
  };

  const handlePreviousTab = () => {
    setCurrentTab(currentTab - 1);
  };

  console.log(event);

  return (
    <div className={`create-form-body ${userContext?.theme}-theme-form`}>
      <h1 className="create-form-header">Create an event</h1>
      <Tabs
        selectedIndex={currentTab}
        onSelect={(index) => setCurrentTab(index)}
      >
        <TabPanel>
          <div className="create-form-page">
            <div className="create-form-page-column">
              <AnimatedInput
                className="event-title"
                onChange={handleChange}
                label="Titulo del evento"
                value={event?.title}
                name="title"
              />
              <CustomDatePicker
                nameStart="startDate"
                nameEnd="endDate"
                theme={userContext.theme}
                className="date-picker-form"
                onChangeStart={handleChange}
                onChangeEnd={handleChange}
                valueStart={event?.startDate}
                valueEnd={event?.endDate}
                required
              />
              <CustomDatePicker
                nameStart="startTime"
                nameEnd="endTime"
                theme={userContext.theme}
                className="date-picker-form"
                onChangeStart={handleChange}
                onChangeEnd={handleChange}
                type="time"
                valueStart={event?.startTime}
                valueEnd={event?.endTime}
                required
              />
            </div>
            <div className="create-form-page-column">
              {userContext?.isLoaded && (
                <Map
                  center
                  mode="form"
                  coordinates={event?.location}
                  setCoordinates={handleChange}
                  name="location"
                />
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="create-form-page">
            <div className="create-form-page-column">
              {tagList.length !== 0 ? <Selector
                multiple
                onChange={handleChange}
                name="tags"
                options={tagList}
                value={event?.tags}
              /> : <p>Loading...</p>}
            </div>
            <div className="create-form-page-column">
              
            </div>
          </div>
        </TabPanel>
        <TabList className="tab-panel">
          <div className="tab-buttons-panel ">
            {currentTab === 0 ? (
              <Tab className="tab-button disabled">Previous</Tab>
            ) : (
              <Tab className="tab-button " onClick={handlePreviousTab}>
                Previous
              </Tab>
            )}
            {currentTab === 1 ? (
              <Tab className="tab-button disabled">Next</Tab>
            ) : (
              <Tab className="tab-button" onClick={handleNextTab}>
                Next
              </Tab>
            )}
          </div>
          <div className="index-reference">
            {currentTab + 1} / {2}
          </div>
        </TabList>
      </Tabs>
    </div>
  );
};

export default NewEvent;
