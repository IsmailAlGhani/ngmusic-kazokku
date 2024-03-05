export const missingObj: { placeholder: string } = {
  placeholder: "",
};

export const customUrlEncode = (input: string) => {
  // Use encodeURIComponent and then replace %20 with +
  let encoded = encodeURIComponent(input).replace(/%20/g, "+");

  // Replace characters that should not be encoded
  encoded = encoded.replace(/[!'()*]/g, function (char) {
    return "%" + char.charCodeAt(0).toString(16);
  });

  return encoded;
};

export const LIMIT_QUERY = 10;
