/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { useState } from "react";
import Select, { components } from "react-select";
import { Plus } from "react-bootstrap-icons";

import TextBubble from "../TextBubble";

import "./TagCollection.scss";

const TagCollection = ({ className, collection, onChange, style, tags }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagDelete = (value) => {
    if (!tags.includes(value)) return;

    let newTags = [...tags];
    newTags = newTags.filter((tag) => tag !== value);
    onChange && onChange(newTags);
  };

  const handleTagAdd = (value) => {
    if (!value) return;

    value = value.trim();
    if (value.length === 0 || tags.includes(value)) return;

    let newTags = [...tags];
    newTags.push(value);
    onChange && onChange(newTags);
  };

  const displayAddIcon = () => {
    return (
      <Plus
        className="hand tagAddIcon"
        onClick={() => handleTagAdd(tagInput)}
      />
    );
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {displayAddIcon()}
      </components.DropdownIndicator>
    );
  };

  return (
    <div className={`tagCollectionContainer ${className}`} style={style}>
      <Select
        className="tagCollection"
        components={{ DropdownIndicator }}
        onChange={(item) => {
          if (item.value) {
            handleTagAdd(item.value);
          }
        }}
        onInputChange={(input) => {
          if (input) {
            setTagInput(input);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTagAdd(tagInput);
          }
        }}
        options={
          collection
            ? collection.map((tag) => {
                return { label: tag, value: tag };
              })
            : []
        }
        placeholder="Add ..."
      />
      <div className="tagsContainer">
        {tags &&
          tags.map((tag, index) => {
            return (
              <TextBubble
                key={index}
                className="tagItem"
                onDelete={handleTagDelete}
                text={tag}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TagCollection;
