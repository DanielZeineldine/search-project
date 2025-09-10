"use client";
import { useState, useMemo } from "react";
import { articles } from "../data/articles";

const Search = () => {
  // search term
  const [searchTerm, setSearchTerm] = useState("");

  // filtered articles
  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    const lowerCased = searchTerm.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerCased) ||
        article.content.toLowerCase().includes(lowerCased)
    );
  }, [searchTerm]);

  // escape regex
  const escapeRegex = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // highlight matches
  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    const escapedTerm = escapeRegex(term);
    console.log(escapedTerm);
    const parts = text.split(new RegExp(`(${escapedTerm})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark className="text-background font-extrabold" key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-[50%] mt-5 mx-5 rounded-2xl mb-5 border border-(--border) box-border outline-none"
        />
        {filteredArticles.map((article) => (
          <div key={article.id} className="mb-5 max-w-[80%] bg-(--foreground) p-4 rounded-xl">
            <h2>
              {article.id}. {highlightText(article.title, searchTerm)}
            </h2>
            <p>{highlightText(article.content, searchTerm)}</p>
          </div>
        ))}
        {filteredArticles.length === 0 && searchTerm && (
          <p>No articles found for "{searchTerm}".</p>
        )}
      </div>
    </>
  );
};

export default Search;
