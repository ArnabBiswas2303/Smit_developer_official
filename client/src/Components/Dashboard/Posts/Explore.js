import React, { Fragment, useState, useEffect } from "react";
import classes from "./prepost.module.css";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Spinner from "../../Layouts/Spinner";
import { setsinglepost, setallpost } from "../../../Actions/post";
import { setusrprofileid } from "../../../Actions/auth";
import Navbar from '../../Layouts/Navbar/Navbar';
import PropTypes from "prop-types";
const Explore = props => {
  const history = useHistory();

  useEffect(() => {
      const func = async () => {
        await props.setallpost();
      }
      func();
  }, []);

  const ViewOtherProfile = async (e, id) => {
    await props.setusrprofileid(id);
    history.push("/viewuserprofile");
  };
  const read = async (e, post) => {
    e.preventDefault();
    await props.setsinglepost(post._id);
    history.push("/post");
  };
  if (props.post.length > 0) {
    return (
      <Fragment>
          <Navbar/>
        <div className="container" style={{ marginTop: "60px" }}>
          <Link to="/createpost">
            <button className={classes["btn"]}>
              <i
                className="fas fa-plus-circle"
                style={{ color: "#720F0F" }}
              ></i>{" "}
              New post
            </button>
          </Link>
        </div>
        {props.post.map(post => {
          const txt = post.posttext.substring(0, 15);
          const photo = "http://localhost:5000/images/" + post.createrpic;
          return (
            <Fragment>
              <div className={"container " + classes["post"]}>
                <div className={classes["heading"]}>
                  <p>{post.heading}</p>
                </div>
                <div className={classes["details"]}>
                  <div className={classes["name"]}>
                    <button
                      className={classes["btn2"]}
                      onClick={e => ViewOtherProfile(e, post.user)}
                    >
                      <i className="fas fa-pen"></i>
                      {post.name}
                    </button>
                  </div>
                  <div className={classes["created"]}>
                    <p>{post.createdAt.toString()}</p>
                  </div>
                </div>
                <div
                  className={classes["photo"]}
                  style={{ backgroundImage: `url(${photo})` }}
                ></div>
                <div className={classes["text"]}>
                  <div className={classes["txt"]}>
                    <p>{txt}.......</p>
                  </div>
                  <button
                    className={classes["full"]}
                    onClick={e => read(e, post)}
                  >
                    Read full post
                  </button>
                </div>
                <div className={classes["lnc"]}>
                  <div className={classes["likes"]}>
                    <p>
                      {" "}
                      {
                        post.likes.length
                      } <i className="fas fa-thumbs-up"></i>{" "}
                    </p>
                  </div>
                  <div className={classes["comments"]}>
                    {" "}
                    {post.comments.length} <i className="fas fa-comments"></i>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="container" style={{ marginTop: "60px" }}>
          <Link to="/createpost">
            <button className={classes["btn"]}>
              <i
                className="fas fa-plus-circle"
                style={{ color: "#720F0F" }}
              ></i>{" "}
              New post
            </button>
          </Link>
        </div>
        <div className={"container " + classes["no"]}>
          <p>No posts yet</p>
          <p>Follow people to see their posts</p>
        </div>
      </Fragment>
    );
  }
};
Explore.propTypes = {
  token: PropTypes.string.isRequired,
  setsinglepost: PropTypes.func.isRequired,
  setallpost: PropTypes.func.isRequired,
  setusrprofileid:PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  token: state.auth.token,
  post: state.post.allposts
});

export default connect(mapStateToProps, {
  setsinglepost,
  setallpost,
  setusrprofileid
})(Explore);