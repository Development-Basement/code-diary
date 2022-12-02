// $prefix -> generic over following name
// _prefix -> a collection

type Record = {
  date: EpochTimeStamp; // timestamp(firebase type)
  language: string; // programming language name
  minutesSpent: number; // number of minutes spent
  rating: number; // 0 - 5 stars
  description: string; // a description of what the programmer did
  tags: Array<string>; // category/tag names
};

type Tag = {
  tagColor: string; // HTML/HEX color code
  name: string; // name of the tag, probably /[a-z-]/, 3 - 13 chars or so
  description: string; // tag description
};

export type DB = {
  users: {
    allUsers: {
      users: Map<string, string>; // UUID -> Username
    };
    $uuid: {
      username: string;
      groups: Array<string>; // GroupID
      profileColor: string; // HTML/HEX color code
    };
  };
  groups: {
    $group: {
      allMembers: Array<string>; // UUID
      admins: Array<string>; //UUID
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
