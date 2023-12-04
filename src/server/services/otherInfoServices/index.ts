import { OtherInfoRequestBody } from "../../types/info";
import { OtherInfo, validateOtherInfoObject } from "./model";

export const saveInfo = async (payload: OtherInfoRequestBody) => {
  const { val, error } = validateOtherInfoObject(payload);
  const existing = await OtherInfo.find({ phone: payload.phone });
  if (error) {
    throw { validation: error };
  }
  try {
    if (existing.length === 0) {
      return await new OtherInfo(val).save();
    } else {
      return await OtherInfo.findOneAndUpdate({ _id: payload._id }, val);
    }
  } catch (e) {
    throw e;
  }
};

export const getInfo = async (payload: { phone: string }) => {
  return await OtherInfo.findOne({ phone: payload.phone }).lean();
};
