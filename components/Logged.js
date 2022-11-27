import style from "../styles/Logged.module.css";
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

function Logged() {

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

  const removeTweet = (x) => {
    // confirm(x)

    fetch(`https://backend-teewt.vercel.app/users/tweets/delete/${x}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  if (tweetContent.length > 280) {
    styleTextMax = { color: "red", transitoin: "all .3s" };
  }

  useEffect(() => {
    if (!logStatus[1]) {
      router.push("/");
    }

    fetch("https://backend-teewt.vercel.app/users/tweets")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTweetData(data.allTweet);
        // setTweetHashtag(data.allTweet);
      });
  }, [tweetData]);

  const regexHashTag = /(#+[a-zA-Z0-9(_)]{1,})/;

  const tweet = () => {
    //get the time of the tweet
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

    // refreshData()

    fetch("https://backend-teewt.vercel.app/users/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: logStatus[1].toString(),
        username: logStatus[2].toString(),
        content: tweetContent.toString(),
        date: time,
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
    setTweetContent("");
  };

  const eraseLogStatus = () => {
    dispatch(eraseId());
    router.push("/");
  };

  const findTweetFromHashtag = (x) => {
    fetch(`https://backend-teewt.vercel.app/users/tweets/${x}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTweetData(data.allTweet);
      });
  };

  const tweetList = tweetData.map((data, i) => {
    if (data.username == logStatus[2] && data.firstname == logStatus[1]) {
      styleHashtag = { display: "inline" };
    } else {
      styleHashtag = { display: "none" };
    }

    let hashtag = data.content.match(regexHashTag);

    return (
      <>
        <div className={style.ListTweet}>
          <ul>
            <li>
              <img src="./iconetwitter.jpeg"></img>
            </li>
            <li>
              <span>{data.username}</span>@{data.firstname}
              <span>{data.date}</span>
            </li>
          </ul>
          <p>{data.content}</p>
          <div className={style.buttonContainer}>
            <span className={style.like}>
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </span>
            <span
              onClick={() => removeTweet(data._id)}
              data-id={data._id}
              style={styleHashtag}
              className={style.erase}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </span>
          </div>
        </div>
      </>
    );
  });
  const unique = [];
  const arrayHashtag = [];

  const allTweetHashtagData = tweetData.map((data, i) => {
    let hashtag = data.content.match(regexHashTag);

    if (hashtag) {
      arrayHashtag.push(hashtag[0]);
    }

    //show unique element in array
    unique = [...new Set(arrayHashtag)];

    //count the number of occurence of hashtag in array
  });

  //know how many time the hashtag is used

  const hashtagList = unique.map((data, i) => {
    let tweetContentNbre = <>Tweet</>;
    //count the number of occurence of hashtag in array
    let count = arrayHashtag.filter((x) => x == data).length;
    if (count > 1) {
      tweetContentNbre = <>Tweets</>;
    }

    return (
      <>
        <li>
          <span
            onClick={() => {
              findTweetFromHashtag(data);
            }}
          >
            {data}
          </span>
          <br></br>
          <span className={style.nbrTweet}>
            {tweetContentNbre}: {count}
          </span>
        </li>
      </>
    );
  });

  const FappearContainerT = ()=>{
    setAppearContainerT(true)
  }

  const FdisappearContainerT = ()=>{
    setAppearContainerT(false)

  }

  if(appearContainerT){
    stylecontainerTrendsMobile={
      transition: "all .3s",
      left: "0",
      opacity: "1",
      visibility: "visible",
    }
  }
  if (isOpen) {
    styleMenuMobile = {
      transition: "all .3s",
      left: "0",
      opacity: "1",
      visibility: "visible",
    };
  }

  // let duplicateChar = arrayHashtag.filter((element, index) => {
  //   return arrayHashtag.indexOf(element) !== index;
  // });

  //show only hashtag

  //not showing the duplicate hashtag from the array and return the hashtag in a list

  return (
    <>
      <div className={style.main}>
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
            <h1>Les Trends</h1>
            <ul className={style.containerTrends}>{hashtagList.reverse()}</ul>

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
          <div className={style.writeTwitter}>
            <h1>Home</h1>
            <input
              onChange={(e) => setTweetContent(e.target.value)}
              value={tweetContent}
              type="text"
              placeholder="What's up"
            ></input>
            <ul className={style.gridButton}>
              <li>
                <span style={styleTextMax}>{tweetContent.length}</span>/280
              </li>
              <li>
                <button onClick={() => tweet()}>Tweet</button>
              </li>
            </ul>
          </div>

          {tweetList.reverse()}
        </div>
        <div className={style.thirdPart}>
          <h1>Trends</h1>
          <ul className={style.containerTrends}>{hashtagList.reverse()}</ul>
        </div>
      </div>
    </>
  );
}

export default Logged;
