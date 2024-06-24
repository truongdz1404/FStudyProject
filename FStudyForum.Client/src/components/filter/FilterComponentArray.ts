import TopicFilter from "./TopicFilter";
import FeatureFilter from "./index"; 
export const filterComponents: FilterComponent[] = [
     {
          id: 1,
          name: "TopicFilter",
          component: TopicFilter
     },
     {
          id: 2,
          name: "FilterComponent",
          component: FeatureFilter
     }
];