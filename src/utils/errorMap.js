const errorMap = (code) => {
  const map = {
    "auth/invalid-email": "սխալ էլեկտրոնային փոստ",
  };
  return map[code];
};

export default errorMap;
