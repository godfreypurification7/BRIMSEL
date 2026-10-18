const KEY = "kids_english_childId";
export function getChildId() {
  let id = localStorage.getItem(KEY);
  if (!id) {
    // matches backend regex: [a-zA-Z0-9_-]{1,64}
    id = "kid_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(KEY, id);
  }
  return id;
}