import React, { useState, useEffect } from "react";
import SanitizedHTML from "../SanitizedHTML";
import links from "./LINKS.json";
import slugify from "slugify";
import queryString from "query-string";
import "./App.css";

const Cards = ({ tools, filters, setSelected, setFilters }) => {
  return tools.map((row) => (
    <Card
      row={row}
      key={row.name}
      setSelected={setSelected}
      setFilters={setFilters}
      filters={filters}
    />
  ));
};

const Card = ({
  setSelected,
  row: {
    name,
    url,
    language,
    tags,
    img,
    width,
    height,
    github,
    twitter,
    platform,
    github_stars,
    pub,
    note,
    alt_url,
  },
  filters,
  setFilters,
}) => {
  const [expanded, setExpanded] = useState(false);
  const slug = slugify(name, { remove: /[*+~.()'"!:@]/g });
  return (
    <div className="card">
      <div>
        <h3>
          <a
            id={slug}
            href="#"
            style={{ color: "black", cursor: "pointer" }}
            onClick={(event) => {
              setSelected({ selected: "#" + slug });
              event.preventDefault();
            }}
          >
            {name}
          </a>
        </h3>
        <p className="link">
          <a href={url}>{url}</a>
        </p>
        {alt_url ? (
          <p className="link">
            Alt url <a href={alt_url}>{alt_url}</a>
          </p>
        ) : null}
        {pub ? (
          <p>
            Publication: {pub.url ? <a href={pub.url}>(direct link)</a> : null}{" "}
            {pub.doi ? (
              <a
                href={
                  pub.doi.startsWith("http")
                    ? pub.doi
                    : "https://dx.doi.org/" + pub.doi
                }
              >
                <SanitizedHTML html={pub.title} />
              </a>
            ) : null}{" "}
            {pub.year ? ` (${pub.year})` : null}
            {pub.citations !== undefined
              ? ` (# citations ${pub.citations})`
              : null}
          </p>
        ) : null}
        {language ? <p>Language: {language.join(", ")}</p> : null}
        {tags ? (
          <p>
            Tags:{" "}
            {tags.map((tag, index) => [
              index > 0 && ", ",
              <a
                key={tag + "-" + index}
                onClick={(event) => {
                  setFilters({ ...filters, tag });
                  event.preventDefault();
                }}
              >
                {tag}
              </a>,
            ])}
          </p>
        ) : null}
        {note ? <p>Note: {note}</p> : null}
        {twitter ? (
          <p className="link">
            Twitter: <a href={twitter}>{twitter}</a>
          </p>
        ) : null}
        {github ? (
          <p className="link">
            Github: <a href={github}>{github}</a>
          </p>
        ) : null}

        {github_stars ? <p>Github Stargazers: {github_stars}</p> : null}
        {platform ? <p>Platform: {platform.join(", ")}</p> : null}
      </div>
      <figure
        role="presentation"
        onClick={() => setExpanded((state) => !state)}
      >
        {img ? (
          <img
            alt={`screenshot of ${name}`}
            loading="lazy"
            className={expanded ? "expanded" : ""}
            width={width}
            height={height}
            src={"img/" + img}
          />
        ) : (
          <p className="no-screenshot">No screenshot</p>
        )}
        {expanded ? (
          <div className="modal-backdrop">
            <img alt={`screenshot of ${name}`} src={"img/" + img} />
          </div>
        ) : null}
      </figure>
    </div>
  );
};

const IndexPage = () => {
  const [filters, setFilters] = useState({});
  const [alreadyScrolledTo, setAlreadyScrolledTo] = useState(false);
  const [sort, setSort] = useState({});
  const [selected, setSelected] = useState({});
  const { language, tag, platform } = filters;

  useEffect(() => {
    const {
      selected,
      language,
      tag,
      platform,
      latest = true,
      citations,
      year,
      stars,
    } = queryString.parse(window.location.search);
    setFilters({ language, tag, platform });
    if (citations || year || stars) {
      setSort({ citations, year, stars });
    } else {
      setSort({ latest });
    }
    setSelected({ selected });
  }, []);

  useEffect(() => {
    const params = queryString.stringify({ ...filters, ...sort, ...selected });
    window.history.pushState(null, null, "?" + params);

    if (selected.selected && !alreadyScrolledTo) {
      let target = document.querySelector(selected.selected);
      if (target) {
        target.scrollIntoView({
          block: "start",
        });
      }
      setAlreadyScrolledTo(true);
    }
  }, [filters, sort, selected, alreadyScrolledTo]);

  let tools = links.links.slice();
  if (sort.latest) {
    tools = tools.reverse();
  }

  if (sort.year !== undefined) {
    tools = tools.sort(
      (a, b) =>
        +(a.pub?.year || Infinity * sort.year) -
        +(b.pub?.year || Infinity * sort.year)
    );
    if (sort.year === -1) {
      tools = tools.reverse();
    }
  }

  if (sort.citations !== undefined) {
    tools = tools.sort(
      (a, b) =>
        +(a.pub?.citations || Infinity * sort.citations) -
        +(b.pub?.citations || Infinity * sort.citations)
    );
    if (sort.citations === -1) {
      tools = tools.reverse();
    }
  }

  if (sort.stars !== undefined) {
    tools = tools.sort(
      (a, b) =>
        +(a.github_stars || Infinity * sort.stars) -
        +(b.github_stars || Infinity * sort.stars)
    );
    if (sort.stars === -1) {
      tools = tools.reverse();
    }
  }

  const filteredTools = tools
    .filter((tool) => (language ? tool.language?.includes(language) : true))
    .filter((tool) => (tag ? tool.tags?.includes(tag) : true))
    .filter((tool) => (platform ? tool.platform?.includes(platform) : true));

  const githubURL = "https://github.com/cmdcolin/awesome-jbrowse2";

  return (
    <main className="page">
      <title>awesome-jbrowse2</title>
      <h1>awesome-jbrowse2</h1>
      <p>
        This is a companion website for the github repo{" "}
        <a href={githubURL}>{githubURL}</a>
      </p>
      <p>
        Also check out our twitter account{" "}
        <a href="https://twitter.com/awesomejbrowse2">@awesomejbrowse2</a>
      </p>
      <div style={{ maxWidth: 500 }}>
        <p>Feel free to submit PRs to add more jbrowse 2 stuff!</p>
      </div>
      <Cards
        filters={filters}
        tools={filteredTools}
        setSelected={setSelected}
        setFilters={setFilters}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        onClick={() => window.scrollTo(0, 0)}
        className="top-link"
        viewBox="0 0 12 6"
      >
        <path d="M12 6H0l6-6z" />
      </svg>
    </main>
  );
};

export default IndexPage;
