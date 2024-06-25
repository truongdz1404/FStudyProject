USE [master]
GO
CREATE DATABASE [FStudyForum]
GO
ALTER DATABASE [FStudyForum] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FStudyForum].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FStudyForum] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FStudyForum] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FStudyForum] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FStudyForum] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FStudyForum] SET ARITHABORT OFF 
GO
ALTER DATABASE [FStudyForum] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [FStudyForum] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FStudyForum] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FStudyForum] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FStudyForum] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FStudyForum] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FStudyForum] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FStudyForum] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FStudyForum] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FStudyForum] SET  ENABLE_BROKER 
GO
ALTER DATABASE [FStudyForum] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FStudyForum] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FStudyForum] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FStudyForum] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FStudyForum] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FStudyForum] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [FStudyForum] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FStudyForum] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FStudyForum] SET  MULTI_USER 
GO
ALTER DATABASE [FStudyForum] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FStudyForum] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FStudyForum] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FStudyForum] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FStudyForum] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FStudyForum] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [FStudyForum] SET QUERY_STORE = ON
GO
ALTER DATABASE [FStudyForum] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [FStudyForum]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 6/25/2024 2:12:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAttachments]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAttachments](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](20) NOT NULL,
	[FileUrl] [nvarchar](255) NOT NULL,
	[PostId] [bigint] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblAttachments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCategories]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCategories](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](300) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblCategories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblComments]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblComments](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreaterId] [nvarchar](450) NOT NULL,
	[PostId] [bigint] NOT NULL,
	[AttachmentId] [bigint] NULL,
	[ReplyToId] [bigint] NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblComments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblDonations]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblDonations](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Amount] [bigint] NOT NULL,
	[Message] [nvarchar](300) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblDonations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblModerators]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblModerators](
	[ModeratedByUsersId] [nvarchar](450) NOT NULL,
	[ModeratedTopicsId] [bigint] NOT NULL,
 CONSTRAINT [PK_tblModerators] PRIMARY KEY CLUSTERED 
(
	[ModeratedByUsersId] ASC,
	[ModeratedTopicsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPosts]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPosts](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[TopicId] [bigint] NOT NULL,
	[CreaterId] [nvarchar](450) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblPosts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProfiles]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProfiles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](25) NOT NULL,
	[LastName] [nvarchar](25) NOT NULL,
	[Gender] [int] NOT NULL,
	[Major] [nvarchar](max) NOT NULL,
	[Bio] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
	[Avatar] [nvarchar](255) NOT NULL,
	[Banner] [nvarchar](255) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblProfiles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblReports]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReports](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](max) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[ResponseContent] [nvarchar](max) NULL,
	[CreaterId] [nvarchar](450) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblReports] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRoleClaims]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_tblRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRoles]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_tblRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblSavedPosts]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblSavedPosts](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[PostId] [bigint] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblSavedPosts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTopicBans]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTopicBans](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[TopicId] [bigint] NOT NULL,
	[BannedTime] [datetime2](7) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblTopicBans] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTopicCategories]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTopicCategories](
	[CategoriesId] [bigint] NOT NULL,
	[TopicsId] [bigint] NOT NULL,
 CONSTRAINT [PK_tblTopicCategories] PRIMARY KEY CLUSTERED 
(
	[CategoriesId] ASC,
	[TopicsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTopics]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTopics](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](25) NOT NULL,
	[Description] [nvarchar](300) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Panner] [nvarchar](300) NOT NULL,
	[Avatar] [nvarchar](300) NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblTopics] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserClaims]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_tblUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserLogins]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_tblUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserRoles]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_tblUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsers](
	[Id] [nvarchar](450) NOT NULL,
	[RefreshToken] [nvarchar](100) NOT NULL,
	[RefreshTokenExpiryTime] [datetime2](7) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_tblUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserTokens]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_tblUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVotes]    Script Date: 6/25/2024 2:12:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVotes](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IsUp] [bit] NOT NULL,
	[VoterId] [nvarchar](450) NOT NULL,
	[PostId] [bigint] NULL,
	[CommentId] [bigint] NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[ModifiedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tblVotes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblAttachments_PostId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblAttachments_PostId] ON [dbo].[tblAttachments]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblComments_AttachmentId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_AttachmentId] ON [dbo].[tblComments]
(
	[AttachmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblComments_CreaterId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_CreaterId] ON [dbo].[tblComments]
(
	[CreaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblComments_PostId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_PostId] ON [dbo].[tblComments]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblComments_ReplyToId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_ReplyToId] ON [dbo].[tblComments]
(
	[ReplyToId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblDonations_UserId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblDonations_UserId] ON [dbo].[tblDonations]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblModerators_ModeratedTopicsId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblModerators_ModeratedTopicsId] ON [dbo].[tblModerators]
(
	[ModeratedTopicsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblPosts_CreaterId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblPosts_CreaterId] ON [dbo].[tblPosts]
(
	[CreaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblPosts_TopicId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblPosts_TopicId] ON [dbo].[tblPosts]
(
	[TopicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblProfiles_UserId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_tblProfiles_UserId] ON [dbo].[tblProfiles]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblReports_CreaterId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblReports_CreaterId] ON [dbo].[tblReports]
(
	[CreaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblRoleClaims_RoleId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblRoleClaims_RoleId] ON [dbo].[tblRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[tblRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblSavedPosts_PostId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblSavedPosts_PostId] ON [dbo].[tblSavedPosts]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblSavedPosts_UserId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblSavedPosts_UserId] ON [dbo].[tblSavedPosts]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblTopicBans_TopicId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblTopicBans_TopicId] ON [dbo].[tblTopicBans]
(
	[TopicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblTopicBans_UserId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblTopicBans_UserId] ON [dbo].[tblTopicBans]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblTopicCategories_TopicsId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblTopicCategories_TopicsId] ON [dbo].[tblTopicCategories]
(
	[TopicsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblTopics_Name]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_tblTopics_Name] ON [dbo].[tblTopics]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblUserClaims_UserId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblUserClaims_UserId] ON [dbo].[tblUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblUserLogins_UserId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblUserLogins_UserId] ON [dbo].[tblUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblUserRoles_RoleId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblUserRoles_RoleId] ON [dbo].[tblUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[tblUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[tblUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblVotes_CommentId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblVotes_CommentId] ON [dbo].[tblVotes]
(
	[CommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblVotes_PostId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblVotes_PostId] ON [dbo].[tblVotes]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblVotes_VoterId]    Script Date: 6/25/2024 2:12:42 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblVotes_VoterId] ON [dbo].[tblVotes]
(
	[VoterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblAttachments]  WITH CHECK ADD  CONSTRAINT [FK_tblAttachments_tblPosts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[tblPosts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblAttachments] CHECK CONSTRAINT [FK_tblAttachments_tblPosts_PostId]
GO
ALTER TABLE [dbo].[tblComments]  WITH CHECK ADD  CONSTRAINT [FK_tblComments_tblAttachments_AttachmentId] FOREIGN KEY([AttachmentId])
REFERENCES [dbo].[tblAttachments] ([Id])
GO
ALTER TABLE [dbo].[tblComments] CHECK CONSTRAINT [FK_tblComments_tblAttachments_AttachmentId]
GO
ALTER TABLE [dbo].[tblComments]  WITH CHECK ADD  CONSTRAINT [FK_tblComments_tblComments_ReplyToId] FOREIGN KEY([ReplyToId])
REFERENCES [dbo].[tblComments] ([Id])
GO
ALTER TABLE [dbo].[tblComments] CHECK CONSTRAINT [FK_tblComments_tblComments_ReplyToId]
GO
ALTER TABLE [dbo].[tblComments]  WITH CHECK ADD  CONSTRAINT [FK_tblComments_tblPosts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[tblPosts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblComments] CHECK CONSTRAINT [FK_tblComments_tblPosts_PostId]
GO
ALTER TABLE [dbo].[tblComments]  WITH CHECK ADD  CONSTRAINT [FK_tblComments_tblUsers_CreaterId] FOREIGN KEY([CreaterId])
REFERENCES [dbo].[tblUsers] ([Id])
GO
ALTER TABLE [dbo].[tblComments] CHECK CONSTRAINT [FK_tblComments_tblUsers_CreaterId]
GO
ALTER TABLE [dbo].[tblDonations]  WITH CHECK ADD  CONSTRAINT [FK_tblDonations_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblDonations] CHECK CONSTRAINT [FK_tblDonations_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblModerators]  WITH CHECK ADD  CONSTRAINT [FK_tblModerators_tblTopics_ModeratedTopicsId] FOREIGN KEY([ModeratedTopicsId])
REFERENCES [dbo].[tblTopics] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblModerators] CHECK CONSTRAINT [FK_tblModerators_tblTopics_ModeratedTopicsId]
GO
ALTER TABLE [dbo].[tblModerators]  WITH CHECK ADD  CONSTRAINT [FK_tblModerators_tblUsers_ModeratedByUsersId] FOREIGN KEY([ModeratedByUsersId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblModerators] CHECK CONSTRAINT [FK_tblModerators_tblUsers_ModeratedByUsersId]
GO
ALTER TABLE [dbo].[tblPosts]  WITH CHECK ADD  CONSTRAINT [FK_tblPosts_tblTopics_TopicId] FOREIGN KEY([TopicId])
REFERENCES [dbo].[tblTopics] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblPosts] CHECK CONSTRAINT [FK_tblPosts_tblTopics_TopicId]
GO
ALTER TABLE [dbo].[tblPosts]  WITH CHECK ADD  CONSTRAINT [FK_tblPosts_tblUsers_CreaterId] FOREIGN KEY([CreaterId])
REFERENCES [dbo].[tblUsers] ([Id])
GO
ALTER TABLE [dbo].[tblPosts] CHECK CONSTRAINT [FK_tblPosts_tblUsers_CreaterId]
GO
ALTER TABLE [dbo].[tblProfiles]  WITH CHECK ADD  CONSTRAINT [FK_tblProfiles_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblProfiles] CHECK CONSTRAINT [FK_tblProfiles_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblReports]  WITH CHECK ADD  CONSTRAINT [FK_tblReports_tblUsers_CreaterId] FOREIGN KEY([CreaterId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblReports] CHECK CONSTRAINT [FK_tblReports_tblUsers_CreaterId]
GO
ALTER TABLE [dbo].[tblRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_tblRoleClaims_tblRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[tblRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblRoleClaims] CHECK CONSTRAINT [FK_tblRoleClaims_tblRoles_RoleId]
GO
ALTER TABLE [dbo].[tblSavedPosts]  WITH CHECK ADD  CONSTRAINT [FK_tblSavedPosts_tblPosts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[tblPosts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblSavedPosts] CHECK CONSTRAINT [FK_tblSavedPosts_tblPosts_PostId]
GO
ALTER TABLE [dbo].[tblSavedPosts]  WITH CHECK ADD  CONSTRAINT [FK_tblSavedPosts_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblSavedPosts] CHECK CONSTRAINT [FK_tblSavedPosts_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblTopicBans]  WITH CHECK ADD  CONSTRAINT [FK_tblTopicBans_tblTopics_TopicId] FOREIGN KEY([TopicId])
REFERENCES [dbo].[tblTopics] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblTopicBans] CHECK CONSTRAINT [FK_tblTopicBans_tblTopics_TopicId]
GO
ALTER TABLE [dbo].[tblTopicBans]  WITH CHECK ADD  CONSTRAINT [FK_tblTopicBans_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblTopicBans] CHECK CONSTRAINT [FK_tblTopicBans_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblTopicCategories]  WITH CHECK ADD  CONSTRAINT [FK_tblTopicCategories_tblCategories_CategoriesId] FOREIGN KEY([CategoriesId])
REFERENCES [dbo].[tblCategories] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblTopicCategories] CHECK CONSTRAINT [FK_tblTopicCategories_tblCategories_CategoriesId]
GO
ALTER TABLE [dbo].[tblTopicCategories]  WITH CHECK ADD  CONSTRAINT [FK_tblTopicCategories_tblTopics_TopicsId] FOREIGN KEY([TopicsId])
REFERENCES [dbo].[tblTopics] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblTopicCategories] CHECK CONSTRAINT [FK_tblTopicCategories_tblTopics_TopicsId]
GO
ALTER TABLE [dbo].[tblUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_tblUserClaims_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblUserClaims] CHECK CONSTRAINT [FK_tblUserClaims_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_tblUserLogins_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblUserLogins] CHECK CONSTRAINT [FK_tblUserLogins_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_tblUserRoles_tblRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[tblRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblUserRoles] CHECK CONSTRAINT [FK_tblUserRoles_tblRoles_RoleId]
GO
ALTER TABLE [dbo].[tblUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_tblUserRoles_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblUserRoles] CHECK CONSTRAINT [FK_tblUserRoles_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_tblUserTokens_tblUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblUserTokens] CHECK CONSTRAINT [FK_tblUserTokens_tblUsers_UserId]
GO
ALTER TABLE [dbo].[tblVotes]  WITH CHECK ADD  CONSTRAINT [FK_tblVotes_tblComments_CommentId] FOREIGN KEY([CommentId])
REFERENCES [dbo].[tblComments] ([Id])
GO
ALTER TABLE [dbo].[tblVotes] CHECK CONSTRAINT [FK_tblVotes_tblComments_CommentId]
GO
ALTER TABLE [dbo].[tblVotes]  WITH CHECK ADD  CONSTRAINT [FK_tblVotes_tblPosts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[tblPosts] ([Id])
GO
ALTER TABLE [dbo].[tblVotes] CHECK CONSTRAINT [FK_tblVotes_tblPosts_PostId]
GO
ALTER TABLE [dbo].[tblVotes]  WITH CHECK ADD  CONSTRAINT [FK_tblVotes_tblUsers_VoterId] FOREIGN KEY([VoterId])
REFERENCES [dbo].[tblUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblVotes] CHECK CONSTRAINT [FK_tblVotes_tblUsers_VoterId]
GO
USE [master]
GO
ALTER DATABASE [FStudyForum] SET  READ_WRITE 
GO
