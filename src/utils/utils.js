export const required = (val) => val && val.length;
export const maxLength = (len) => (val) => !(val) || (val.length <= len);
export const minLength = (len) => (val) => val && (val.length >= len);
export const isNumber = (val) => !isNaN(Number(val));
export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export const requiredText = ' Trường bắt buộc';
export const validEmailText = ' Định dạng email không hợp lệ';
export const isNumberText = ' Trường yêu cầu định dạng số';
export const maxLengthText = (val) => `Tối đa: ${val} kí tự`;
export const minLengthText = (val) => `Tối thiểu: ${val} kí tự`;
export const convertObjectToArray = (object) => Object.keys(object).map(i => object[i]);