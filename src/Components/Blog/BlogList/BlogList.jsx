import React, { useState } from "react";

import "./BlogList.css";

import BlogData from "../../../Data/BlogData";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState("FASHION");
  const [filteredBlogs, setFilteredBlogs] = useState(BlogData);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "ALL") {
      setFilteredBlogs(BlogData);
    } else {
      // Filter blogs based on category (you can modify this logic based on your data structure)
      const filtered = BlogData.filter(blog => 
        blog.category && blog.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredBlogs(filtered.length > 0 ? filtered : BlogData);
    }
  };

  return (
    <>
      <div className="blogListSection">
        <div className="blogListHeaderContainer">
          <div className="blogListHeader">
            <h2>The Blog</h2>
            <div className="blogListHeaderCategories">
              <p 
                className={activeCategory === "ALL" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("ALL")}
              >
                ALL
              </p>
              <p 
                className={activeCategory === "COMPANY" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("COMPANY")}
              >
                COMPANY
              </p>
              <p 
                className={activeCategory === "FASHION" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("FASHION")}
              >
                FASHION
              </p>
              <p 
                className={activeCategory === "STYLE" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("STYLE")}
              >
                STYLE
              </p>
              <p 
                className={activeCategory === "TRENDS" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("TRENDS")}
              >
                TRENDS
              </p>
              <p 
                className={activeCategory === "BEAUTY" ? "activeCategory" : ""}
                onClick={() => handleCategoryClick("BEAUTY")}
              >
                BEAUTY
              </p>
            </div>
          </div>
        </div>
        <div className="blogPostListContainer">
          {filteredBlogs.map((blogPost) => (
            <div key={blogPost.blogID} className="blogPost">
              <div className="blogPostThumb">
                <img src={blogPost.blogThumbnail} alt="blogPost" />
              </div>
              <div className="blogPostContent">
                <div className="blogPostContentDate">
                  <p>by admin</p>
                  <p>{blogPost.blogDate}</p>
                </div>
                <div className="blogPostContentHeading">
                  <Link to="/BlogDetails" onClick={scrollToTop}>
                    {blogPost.blogHeading}
                  </Link>
                </div>
                <div className="blogPostContentDescription">
                  <p>
                    Midst one brought greater also morning green saying had
                    good. Open stars day let over gathered, grass face one every
                    light of under.
                  </p>
                </div>
                <div className="blogPostContentReadMore">
                  <Link to="/BlogDetails" onClick={scrollToTop}>
                    Continue Reading
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="blogListShowMore" onClick={scrollToTop}>
          Show More
        </p>
      </div>
    </>
  );
};

export default BlogList;
