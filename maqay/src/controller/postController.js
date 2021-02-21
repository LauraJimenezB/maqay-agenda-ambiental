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

export const getAllPosts = () => {
  return fetch(`${URLroot}wp/v2/posts`, getOptions).then((res) => res.json()).catch((error)=>console.log(error));
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
        return { id: object.id, name: object.name };
      });
    });
}; */

export const getTagsByGroupName = (allTags, groupName) => {
  const group = allTags.find((group) => group.label === groupName.replace(/-/g, " "));
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
