const URLroot = "https://maqay.org/wp-json/";
const headers = {
  "Content-Type": "application/json",
};

const getOptions = {
  method: "GET",
  mode: "cors",
  headers,
};

export const getAllPosts = () => {
  return fetch(`${URLroot}/wp/v2/posts`, getOptions).then((res) => res.json());
};

export const getAllTagsNameAndNumber = () => {
  return fetch(`${URLroot}tag-groups/v1/terms/`).then((res) => res.json());
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
  const group = allTags.find((group) => group.label === groupName);
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
