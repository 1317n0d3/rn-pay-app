export const colors = {
  ACCENT: "#289256",
  BG_GRAY: "#141414",
  TEXT_GRAY: "#8D9699",
};

export const styles = {
  flexDefault: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.BG_GRAY,
    borderColor: colors.ACCENT,
    borderRadius: 10,
    color: "#fff",
  },

  transactionCard: {
    backgroundColor: "#2C2C2C",
    margin: 12,
    padding: 14,
    borderRadius: 20,
  },

  transactionCardText: {
    color: "#fff",
    fontWeight: "600",
  },
};
