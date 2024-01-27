export type RootParamList = {
  groups: undefined;
  newGroups: undefined;
  players: {
    group: string;
  };
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      newGroups: undefined;
      players: {
        group: string;
      };
    }
  }
}
