/// IMPORTS ///

// Data / API / Hooks / Context
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

// Media / CSS
import appCss from "../../App.module.css";
import css from "../../css/PostsPage.module.css";
import NoResults from "../../assets/no-results.png";

// Components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Asset from "../../components/Asset";
import Icon from "../../components/Icon";
import InfiniteScroll from "react-infinite-scroll-component";

// utils
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/popularProfiles";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, query]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Icon name="search" className={css.SearchIcon} />
        <Form className={css.SearchBar} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search Posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appCss.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appCss.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
