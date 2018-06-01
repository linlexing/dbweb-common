import { createAction } from "typesafe-actions";

const changeUserName = createAction("[recordview]changeUserName", resolve => (val: string) => resolve(val));
export { changeUserName };
