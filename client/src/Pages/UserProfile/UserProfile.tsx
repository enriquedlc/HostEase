import { useEffect, useState } from "react";
import "./UserProfile.css";
import {
  fetchFollowers,
  fetchUser,
  fetchUserEvents,
  followInteraction,
} from "../../services/main.services";
import { useOutletContext, useParams } from "react-router-dom";
import {
  FollowerUserData,
  GeneralMinimalistUserData,
  HostEaseEvent,
  ShortUser,
  User,
  UserContextValue,
} from "../../Types/Types";
import { CgProfile } from "react-icons/cg";
import ProfileEventCard from "../../Components/ProfileCards/ProfileEventCard/ProfileEventCard";
import where from "./assets/where.png";
import sadge from "./assets/sadge.png";
import { formatDate } from "../../services/Utils/main.utils";
import ProfileUserCard from "../../Components/ProfileCards/ProfileUserCard/ProfileUserCard";

const UserProfile = () => {
  const userContext = useOutletContext<UserContextValue | null>();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userCurrentEvents, setUserCurrentEvents] = useState<HostEaseEvent[]>(
    []
  );

  const { id } = useParams();

  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [followers, setFollowers] = useState<GeneralMinimalistUserData[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);

  const handleFollow = () => {
    setIsFollowed((prevFoll) => !prevFoll);
    if (userContext?.user && id) {
      followInteraction(userContext?.user?.id, parseInt(id)).then(
        (response) => {
          console.log(response.data.data);
          setFollowersCount((prevCount) => {
            const newValue = response.data.data ? prevCount + 1 : prevCount - 1;
            return newValue;
          });
        }
      );
    }
  };

  useEffect(() => {
    const getUserProfile = (userId: number) => {
      fetchUser(userId).then((response) => {
        if (response.data.data) {
          setUserProfile(response.data.data);
        }
      });
      fetchUserEvents(userId).then((response) => {
        if (response.data.data) {
          setUserCurrentEvents(response.data.data);
        }
      });
      fetchFollowers(userId).then((response) => {
        const user: User = response.data.data;
        console.log(user.followers);
        setFollowers(user.followers);
      });
    };

    id && getUserProfile(parseInt(id));
  }, [id]);

  useEffect(() => {
    if (followers && (id && parseInt(id)) !== userContext?.user?.id) {
      followers.forEach(({ userId }) => {
        if (userId === userContext?.user?.id) {
          setIsFollowed(true);
        }
      });
    }
    setFollowersCount(followers.length);
  }, [followers]);

  return (
    <>
      <div className={`${userContext?.theme}-user-profile user-profile`}>
        <div className="user-profile-head">
          <CgProfile />
          <h1>{userProfile?.nickname}</h1>
          <h5>
            Member since:{" "}
            <span>
              {userProfile?.joinedAt && formatDate(userProfile?.joinedAt)}
            </span>
          </h5>
          <span className="followers">{followersCount} Followers</span>
          {userProfile?.id !== userContext?.user?.id && (
            <button className="follow-user-button" onClick={handleFollow}>
              {isFollowed && followersCount !== 0 ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="profile-body-content">
          {userCurrentEvents.length <= 0 ? (
            <div className="event-column">
              <div className={`no-events-yet ${userContext?.theme}-theme-mssg`}>
                <img
                  src={where}
                  alt="Tom looking for events"
                  className="no-events-image"
                />
                <h2>Esto está muy vacío.</h2>
                <h3>
                  {userContext?.user?.id === (id && parseInt(id))
                    ? "Vaya, no tienes ningun evento por aquí... Prueba a unirte a uno nuevo desde la pestaña de \'Explore\'"
                    : "Parece que este usuario no ha creado ni se ha unido a ningún evento"}
                  
                </h3>
              </div>
            </div>
          ) : (
            <div className="event-column">
              <h1>Events: </h1>
              {userCurrentEvents.map(
                ({
                  id,
                  likes,
                  users,
                  category,
                  tags,
                  maxCapacity,
                  title,
                  owner,
                }) => {
                  return (
                    <ProfileEventCard
                      key={id}
                      id={id}
                      isOwner={owner.id === userProfile?.id}
                      title={title}
                      category={category?.categoryName}
                      tagsNumber={tags?.length}
                      maxCapacity={maxCapacity}
                      users={users}
                      likes={likes}
                      theme={userContext?.theme}
                    />
                  );
                }
              )}
            </div>
          )}

          {followers.length <= 0 ? (
            <div className="event-column">
              <div className={`no-events-yet ${userContext?.theme}-theme-mssg`}>
                <img
                  src={sadge}
                  alt="Tom looking for events"
                  className="no-events-image"
                />
                <h2>Jope, pobrecillo.</h2>
                <h3>
                  {userContext?.user?.id === (id && parseInt(id))
                    ? "Prueba a unirte a un evento para conocer más gente"
                    : "Este usuario está muy solo, ¿Por qué no le echas ahí un follow?"}
                </h3>
              </div>
            </div>
          ) : (
            <div className="user-column">
              <h1>Followers: </h1>
              {followers.map(({ userId, userName, userEmail }) => {
                return (
                  <ProfileUserCard
                    key={userId}
                    userId={userId}
                    userName={userName}
                    theme={userContext?.theme}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
