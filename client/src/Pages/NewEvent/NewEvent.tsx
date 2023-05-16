import { useContext, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import UserContext from "../../Context/UserContext";
import "./NewEvent.css";
import { UserContextValue } from "../../Types/Types";
import { useOutletContext } from "react-router-dom";

const NewEvent = () => {

  const userContext = useOutletContext<UserContextValue>();
  const [currentTab, setCurrentTab] = useState(0);

  const handleNextTab = () => {
    setCurrentTab(currentTab + 1);
  };

  const handlePreviousTab = () => {
    setCurrentTab(currentTab - 1);
  };

  return (
    <div className={`create-form-body ${userContext?.theme}-theme-form`}>
      <h1>Create an Event</h1>
      <Tabs
        selectedIndex={currentTab}
        onSelect={(index) => setCurrentTab(index)}
      >
        <TabPanel>
          <div>
            <input type="text" placeholder="Title" />
          </div>
        </TabPanel>
        <TabPanel>
          <div>Content of second tab</div>
        </TabPanel>
        <TabList className="tab-list">
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
        </TabList>
      </Tabs>
    </div>
  );
};

export default NewEvent;
