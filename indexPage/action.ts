import { createAction } from "typesafe-actions";

const changeUserName = createAction("[index]changeUserName", resolve => (val: string) => resolve(val));
export { changeUserName };
