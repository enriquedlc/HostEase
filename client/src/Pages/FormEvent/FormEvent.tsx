import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { toast } from "react-toastify";
import CustomDatePicker from "../../Components/CustomDatePicker";
import AnimatedInput from "../../Components/Inputs/AnimatedInput";
import Map from "../../Components/Map";
import Selector from "../../Components/Selector";
import {
  Category,
  HostEaseEvent,
  HostEaseEventForm,
  HostEaseHandlerFunction,
  Tag,
  UserContextValue,
} from "../../Types/Types";
import {
  createEvent,
  fetchAllCategories,
  fetchAllTags,
  fetchInfoFromEvent,
  updateEvent,
} from "../../services/main.services";
import "./FormEvent.css";
import Select from "react-select";
import { formatDate, formatHour } from "../../services/Utils/main.utils";

interface CategoryOptions {
  value: number;
  label: string;
}

const currentDate = formatDate(new Date().toISOString());
const initialStartHour = formatHour(new Date());
const initialEndHour = formatHour(
  new Date(new Date().getTime() + 60 * 60 * 1000)
);

const defaultObject : HostEaseEventForm = {
  title: "",
  description: "",
  tags: [],
  maxCapacity: 5,
  startDate: currentDate,
  endDate: currentDate,
  startTime: initialStartHour,
  endTime: initialEndHour,
  location: null,
}

const FormEvent = () => {
  const userContext = useOutletContext<UserContextValue>();


  const [event, setEvent] = useState<HostEaseEventForm>({});
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryOptions[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async (eventId: number, userId: number) => {
      fetchInfoFromEvent(eventId, userId).then((response) => {
        const newEvent: HostEaseEvent = response.data.data.event;
        if (newEvent) {
          console.log(newEvent);
          setEvent(newEvent);
        }
      });
    };

    id ? userContext.user && fetchEvent(parseInt(id), userContext?.user?.id) : setEvent(defaultObject);
  }, [id]);

  useEffect(() => {
    const getListOfCategories = async () => {
      await fetchAllCategories().then((response) => {
        setCategoryList(
          response.data.data.map((category: Category) => ({
            value: category.id,
            label: category.categoryName,
          }))
        );
        console.log(categoryList);
        setEvent((prevEvent) => ({
          ...prevEvent,
          category: response.data.data[0],
        }));
      });
    };
    getListOfCategories();
    id === undefined && setEvent(defaultObject);
  }, []);

  useEffect(() => {
    const getListOfTags = async () => {
      await fetchAllTags().then((response) => setTagList(response.data.data));
    };

    getListOfTags();
  }, []);

  const handleChange: HostEaseHandlerFunction = (data: any, name: string) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      Object.values(event).every((value) => {
        if (value === null || value === undefined || value === "") {
          return false;
        } else {
          return true;
        }
      })
    ) {
      if (id && event?.id) {
        console.log(event);
        updateEvent(event?.id, event).then((response) => {
          if (response.data.data) {
            if (!toast.isActive("formSuccessMessage")) {
              toast.success("Se ha actualizado el evento correctamente.", {
                toastId: "formSuccessMessage",
                theme: userContext?.theme,
              });
            }
            navigate(`/events/${userContext.user?.id}`)
          } else {
            if (!toast.isActive("formFatalMessage")) {
              toast.error("Ha ocurrido un error al actualizar el evento.", {
                toastId: "formFatalMessage",
                theme: userContext?.theme,
              });
            }
            return false;
          }
        })
      } else {
        userContext.user &&
          createEvent(event, userContext.user?.id).then((response) => {
            if (response.data.data) {
              if (!toast.isActive("formSuccessMessage")) {
                toast.success("Se ha creado el evento correctamente.", {
                  toastId: "formSuccessMessage",
                  theme: userContext?.theme,
                });
              }
              navigate(`/events/${userContext.user?.id}`)
            } else {
              if (!toast.isActive("formFatalMessage")) {
                toast.error("Ha ocurrido un error al crear el evento.", {
                  toastId: "formFatalMessage",
                  theme: userContext?.theme,
                });
              }
              return false;
            }
          });
      }
    } else {
      if (!toast.isActive("formErrorMessage")) {
        toast.error("Rellene todos los campos del formulario.", {
          toastId: "formErrorMessage",
          theme: userContext?.theme,
        });
      }
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className={`create-form-body ${userContext?.theme}-theme-form`}
    >
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
                label="Event Title"
                value={event?.title}
                name="title"
              />
              <input
                className="max-capacity"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                value={event?.maxCapacity}
                type="number"
                placeholder="Max Capacity"
                name="maxCapacity"
                min={5}
                required
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
                className="map-mobile"
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
              {tagList.length !== 0 ? (
                <div className="tag-selector">
                  {/* Este selector está hecho por nosotros concretamente (@enriquedlc)*/}
                  <Selector
                    multiple
                    onChange={handleChange}
                    name="tags"
                    options={tagList}
                    value={event?.tags}
                    isDisabled={id ? true : false}
                  />
                </div>
              ) : (
                <p>Loading...</p>
              )}
              <div className="description-form">
                <label htmlFor="description" className="description-label">
                  Description:
                </label>
                <textarea
                  placeholder="Type here your description..."
                  name="description"
                  className="description-textarea"
                  cols={40}
                  rows={10}
                  draggable={false}
                  value={event?.description}
                  onChange={(e) => handleChange(e.target.value, e.target.name)}
                />
              </div>
              <div className="button-submit-panel">
                <button type="submit">Submit</button>
              </div>
            </div>
            <div className="create-form-page-column">
              {categoryList && event.category ? (
                <>
                  <label>Category: </label>
                  <Select
                    classNamePrefix="category-select"
                    options={categoryList}
                    value={{
                      value: event.category.id,
                      label: event.category.categoryName,
                    }}
                    onChange={(value, { action }) => {
                      if (action === "select-option" && value) {
                        handleChange(
                          { id: value?.value, categoryName: value?.label },
                          "category"
                        );
                      }
                    }}
                    className="category-select"
                    required
                    isDisabled={id ? true : false}
                  />
                </>
              ) : (
                <p>Loading...</p>
              )}
              {/* <div className="photo-form">
                <label className="photo-label" htmlFor="photo">
                  Image:{" "}
                </label>
                <input
                  className="photo-input"
                  type="file"
                  name="photo"
                  accept=".jpeg, .jpg, .png, .svg"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    const allowedExtensions = /(\.jpeg|\.jpg|\.png|\.svg)$/i;
                    if (file && !allowedExtensions.exec(file.name)) {
                      if (!toast.isActive("eventFormErrorMessage")) {
                        toast.error("Formato de imagen no válido.", {
                          toastId: "eventFormErrorMessage",
                          theme: userContext.theme,
                        });
                      }
                      e.target.value = "";
                    } else if (file) {
                      handleChange(file, e.target.name);
                    }
                  }}
                />
              </div> */}
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
    </form>
  );
};

export default FormEvent;
