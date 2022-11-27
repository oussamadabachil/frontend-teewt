import style from "../styles/Logged.module.css";
import styles from "../styles/Home.module.css";
import stylep from "../styles/PageUser.module.css";
import { Animated } from "react-animated-css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showStatusLog, showIds, eraseId } from "../reducers/logged";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faHome,
  faHashtag,
  faBell,
  faEnvelope,
  faRightFromBracket,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import Hamburger from "hamburger-react";

function PageUser() {
    const [nbreLike, setNbreLike] = useState(0);

  const [messageStatus, setMessageStatus] = useState("")
  const [appearPopUpMessage, setAppearPopUpMessage] = useState(false);
  let stylePopUpMessage = {}

  const [successStyle, setSuccessStyle ] = useState(false)
  let stylePMessage = {}
  let stylecontainerTrendsMobile = {}
  const [appearContainerT,setAppearContainerT] = useState(false)
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const [tweetData, setTweetData] = useState([]);
  const [tweetContent, setTweetContent] = useState([]);
  const [tweetHashtag, setTweetHashtag] = useState([]);
  let logStatus = useSelector((state) => state.logged.value);
  const [isErased, setIsErased] = useState(false);
  let styleMenuMobile = {};

  let styleHashtag = {};
  let styleTextMax = {};


    

    return (
    <>
    <div className={style.main}>
      <div className={styles.popUpMessage} onClick={
        ()=>   setAppearPopUpMessage(false)

      } style={stylePopUpMessage}>
        <div className={styles.popUpMessageContent}>
          <p style={stylePMessage}>{messageStatus}</p>
        </div>
      </div>
        <div className={style.firstPart}>
          <img src="/twitter_logo_white.png" alt="logo white png"></img>
          <div className={style.infoContainer}>
            <figure>
              <img src="/iconetwitter.jpeg" alt="icone twitter"></img>
              <figcaption>
                <h4>{logStatus[1]}</h4>
                <p>@{logStatus[2]}</p>
              </figcaption>
            </figure>

            <button onClick={() => eraseLogStatus()}>Logout</button>
          </div>
        </div>
        <div className={style.secondPart}>
          <div className={style.HeaderMobile}>
            <span>
              <Hamburger
                toggle={setOpen}
                toggled={isOpen}
                className={style.Hamburger}
                direction="right"
              />
            </span>
            <img src="/twitter_logo_white.png" alt="logo white png"></img>
          </div>

          <div className={style.containerTrendsMobile}  style={stylecontainerTrendsMobile}>
            <button onClick={()=>{
                    FdisappearContainerT()
                    }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
            <h1>Les Trends </h1>


            {/* <ul className={style.containerTrends}>{hashtagList.reverse()}</ul> */}

          </div>
          <div className={style.menuMobile} style={styleMenuMobile}>
            <div className={style.contentLog}>
              <h1>Bonjour {logStatus[1]}</h1>
              <p>@{logStatus[2]}</p>
            </div>

            <ul>
              <li>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                </span>
                Home
              </li>
              <li onClick={()=>
                    FappearContainerT()
                    }>
                <span>
                  <FontAwesomeIcon  icon={faHashtag}></FontAwesomeIcon>
                </span>
                Explore
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                </span>
                Notifications
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </span>
                Messages
              </li>

              <li onClick={() => eraseLogStatus()}>
                <span>
                  <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                </span>
                Déconnexion
              </li>
            </ul>
          </div>
          <div className={stylep.writeTwitter}>
            <figure>
                <img src="/iconetwitter.jpeg" alt="icone twitter"></img>
                <figcaption>
                    <h4>Nom de la personne touchée</h4>
                    <p>firstname</p>
                </figcaption>
            </figure>

        
          </div>
          <h2 className={stylep.title}>Tous ses Tweets </h2>

          {/* {tweetList.reverse()} */}
        </div>
        <div className={style.thirdPart}>
          <h1>Trends</h1>
          {/* <ul className={style.containerTrends}>{hashtagList.reverse()}</ul> */}
        </div>
      </div>
    
    </>
      
    )



}


export default PageUser;