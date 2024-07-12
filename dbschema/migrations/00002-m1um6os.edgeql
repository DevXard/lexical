CREATE MIGRATION m1um6osybol7fd24czbcc7gerpjpylljk7oa6pzl7suz7s3c2ra3va
    ONTO m1hdcjimphd2hvuaxyk5sffwfxnktb3sj3dfo7s35k75qynnf4j5ea
{
  CREATE FUTURE nonrecursive_access_policies;
  ALTER TYPE default::Account {
      ALTER PROPERTY providerAccountId {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE CONSTRAINT std::exclusive ON ((.provider, .providerAccountId));
      ALTER LINK user {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Session {
      ALTER LINK user {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          DROP CONSTRAINT std::exclusive ON (std::str_lower(__subject__));
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::VerificationToken {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      ALTER PROPERTY identifier {
          DROP CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY token {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
