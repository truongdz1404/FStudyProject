import { SessionStorageKey } from "@/helpers/constants";
import { Post } from "@/types/post";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FilterComponentProps {
  setSelectedFilter: (filter: string) => void;
  selectedFilter: string;
  postCollection: Post[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ setSelectedFilter, selectedFilter, postCollection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChevronDown, setIsChevronDown] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const NEW = "new";
  const HOT = "hot";



  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current?.contains(e.target as Node)) {
        return;
      }
      setIsChevronDown(false);
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={node}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsChevronDown(!isChevronDown);
        }}
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <Filter className="w-4 h-4 mr-2 mt-1" />
        Sort by
        {isChevronDown ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2 z-50">
          <div
            className={
              selectedFilter === NEW
                ? "bg-orange-400 block px-4 py-2 text-sm text-gray-700 rounded-md cursor-pointer"
                : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            }
            onClick={() => {
              if (postCollection.length === 0) return;
              sessionStorage.setItem(SessionStorageKey.SelectedFeature, NEW);
              setSelectedFilter(NEW);
            }}
          >
            New
          </div>
          <div
            className={
              selectedFilter === HOT
                ? "bg-orange-400 block px-4 py-2 text-sm text-gray-700 rounded-md cursor-pointer"
                : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            }
            onClick={() => {
              if (postCollection.length === 0) return;
              sessionStorage.setItem(SessionStorageKey.SelectedFeature, HOT);
              setSelectedFilter(HOT);
            }}
          >
            Hot
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
