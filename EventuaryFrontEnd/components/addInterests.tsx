"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

const categories = [
  "Technology", "Healthcare", "Consulting", "Economics", 
  "Education", "Political Science", "Environment", "Biology", 
  "Chemistry", "Humanities", "Banking", "Engineering"
];

const tags = [
  "Workshop", "Seminar", "Talk", "Networking", 
  "Lecture", "Webinar", "Career Fair"
];

export default function Interests() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentTag, setCurrentTag] = useState<string>("");

  const handleAddCategory = () => {
    if (currentCategory && !selectedCategories.includes(currentCategory)) {
      const updatedCategories = [...selectedCategories, currentCategory];
      setSelectedCategories(updatedCategories);
      updateInterestsInDatabase({ categories: updatedCategories, tags: selectedTags });
      setCurrentCategory("");
    }
  };

  const handleAddTag = () => {
    if (currentTag && !selectedTags.includes(currentTag)) {
      const updatedTags = [...selectedTags, currentTag];
      setSelectedTags(updatedTags);
      updateInterestsInDatabase({ categories: selectedCategories, tags: updatedTags });
      setCurrentTag("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updatedCategories);
    updateInterestsInDatabase({ categories: updatedCategories, tags: selectedTags });
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    updateInterestsInDatabase({ categories: selectedCategories, tags: updatedTags });
  };

  const updateInterestsInDatabase = async (interests: { categories: string[], tags: string[] }) => {
    console.log("Updating database with interests:", interests);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Interests updated in database.");
  };

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">My Event Categories</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCategories.map((category, index) => (
            <Badge
              key={index}
              className="flex items-center space-x-2 cursor-pointer bg-customBlue text-white px-3 py-1 rounded-md"
              onClick={() => handleRemoveCategory(category)}
            >
              {category}
              <span className="ml-2 text-sm font-bold">×</span>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Select value={currentCategory} onValueChange={setCurrentCategory}>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          <Button variant="default" className="bg-customBlue hover:bg-customBlue/90" onClick={handleAddCategory}>
            Add
          </Button>
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">My Event Types</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag, index) => (
            <Badge
              key={index}
              className="flex items-center space-x-2 cursor-pointer bg-customBlue text-white px-3 py-1 rounded-md"
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
              <span className="ml-2 text-sm font-bold">×</span>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Select value={currentTag} onValueChange={setCurrentTag}>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
          <Button variant="default" className="bg-customBlue hover:bg-customBlue/90" onClick={handleAddTag}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}