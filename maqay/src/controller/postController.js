const URLroot = "https://maqay.org/wp-json/";
const headers = {
  "Content-Type": "application/json",
  /* "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "access-control-allow-headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
  , */
  /* "Access-Control-Allow-Origin": "localhost:3000", */
 /*  "Access-Control-Allow-Credentials": "true", */
};

const getOptions = {
  method: "GET",
  mode: "cors",
  headers,
};

export const getAllPosts= ( pageLimit=100, pageNumber=1) => {
  return fetch(`${URLroot}wp/v2/posts?per_page=${pageLimit}&page=${pageNumber}`, getOptions)
  .then((res) => res.json())
  .catch((error)=>console.log(error));

};

console.log(getAllPosts().then(res => console.log(res)))

export const getAllTagsNameAndNumber = () => {
  return fetch(`${URLroot}tag-groups/v1/terms/`).then((res) => res);
};
/* export const getAllTagsNameAndNumber = () => {
  return fetch(`${URLroot}tag-groups/v1/terms/`)
    .then((res) => res.json())
    .then((tagGroups) => {
      return tagGroups.map((object) => {
        return { id: object.id, name: object.name, groupName:object.groups[0] };//agregar groupname, groups es array de 1 elemento
      });
    });
}; */

export const getTagsByGroupName = (allTags, groupName) => {
  const group = allTags.find(
    (group) => 
      group.label === groupName
  );
  return group.terms;
}; 
/* export const getTagsByGroupName = (groupName) => {
  return fetch(`${URLroot}tag-groups/v1/groups/`)
    .then((resp) => resp.json())
    .then((groups) => {
      return groups.find((group) => group.label === groupName);
    })
    .then((group) => {
      return group.terms;
    });
}; */
