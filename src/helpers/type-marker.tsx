export const formatMarkerType = (type: string) => {
  switch (type.toUpperCase()) {
    case "AUTO":
      return "Auto";
    case "STATIC":
      return "Static";
    case "AB":
      return "A/B";
    default:
      return type;
  }
};
