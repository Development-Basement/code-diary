// $prefix -> generic over following name
// _prefix -> a collection

type Record = {
  date: EpochTimeStamp; // timestamp(firebase type)
  description: string; // a description of what the programmer did
  language: string; // programming language name
  minutesSpent: number; // number of minutes spent
  rating: number; // 0 - 5 stars
  tags: Array<string>; // category/tag names
};

type Tag = {
  description: string; // tag description
  name: string; // name of the tag, probably /[a-z-]/, 3 - 13 chars or so
  tagColor: string; // HTML/HEX color code
};

export type DB = {
  users: {
    accountInfo: {
      _private: {
        $uuid: {
          groups: Array<string>; // GroupID
          invites: Map<string, string>; // GroupID, from (user)
        };
      };
      _public: {
        $uuid: {
          profileColor: string; // HTML/HEX color code
          username: string;
        };
      };
    };
  };
  groups: {
    $group: {
      admins: Array<string>; //UUID
      allMembers: Array<string>; // UUID
      _$uuid: {
        $recordId: Record;
      };
      _tags: {
        $tag: Tag;
      };
    };
  };
  userRecords: {
    $uuid: {
      _records: {
        $recordId: Record;
      };
      _tags: {
        $tag: Tag;
      };
    };
  };
};
