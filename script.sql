USE [master]
GO
/****** Object:  Database [FStudyForum]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblAttachments]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblCategories]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblComments]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblDonations]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblModerators]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblPosts]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblProfiles]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblReports]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblRoleClaims]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblRoles]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblSavedPosts]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblTopicBans]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblTopicCategories]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblTopics]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblUserClaims]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblUserLogins]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblUserRoles]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblUsers]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblUserTokens]    Script Date: 6/25/2024 2:18:10 PM ******/
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
/****** Object:  Table [dbo].[tblVotes]    Script Date: 6/25/2024 2:18:10 PM ******/
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240617143815_Init', N'8.0.2')
GO
SET IDENTITY_INSERT [dbo].[tblAttachments] ON 

INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (35, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachment925223df-5974-45a9-873f-8bcbe1a90f38_width3000_height3872?alt=media&token=d1eeef76-c145-4feb-a270-9be0d8f54f25', 29, CAST(N'2024-06-22T00:49:50.0288938' AS DateTime2), CAST(N'2024-06-22T00:49:50.0288921' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (36, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachmentc9ee9e57-0f2e-452c-a2ea-e7e1bd8a73ab_width1920_height1200?alt=media&token=7bee0e0e-5ee8-4260-b86b-d82cbfa76b5f', 30, CAST(N'2024-06-22T00:55:21.7728623' AS DateTime2), CAST(N'2024-06-22T00:55:21.7728616' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (37, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachmente61f7bf9-2797-4e2f-8f83-c42d4fb55d8b_width1920_height1200?alt=media&token=3bba814f-d33c-41d9-962e-0e748bc74964', 31, CAST(N'2024-06-22T01:44:57.7295776' AS DateTime2), CAST(N'2024-06-22T01:44:57.7295765' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (38, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachment98fd5672-2aef-4e77-9fe7-cefc70d114ee_width4251_height2325?alt=media&token=8134f88b-0f1a-4a26-8f63-a781c99320c5', 31, CAST(N'2024-06-22T01:44:57.7295785' AS DateTime2), CAST(N'2024-06-22T01:44:57.7295784' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (39, N'image/png', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachment9c67bcd9-d60d-4bc4-9d1d-43c407cc58e7_width700_height467?alt=media&token=358d774d-bf51-4bf7-94d2-90a14ffa4ae7', 31, CAST(N'2024-06-22T01:44:57.7295787' AS DateTime2), CAST(N'2024-06-22T01:44:57.7295786' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (40, N'image/png', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachmentd1e8d0ff-b151-4081-b0b5-77d526b572cc_width517_height700?alt=media&token=e79bb65a-42ca-4752-94c6-00022834d38d', 33, CAST(N'2024-06-25T13:26:32.0963254' AS DateTime2), CAST(N'2024-06-25T13:26:32.0960933' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (41, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachmentb24a7ef5-2f56-4a33-a93d-6490dc85ff9b_width1920_height2560?alt=media&token=78682fc4-4652-43b3-aa87-ac1460152a4f', 33, CAST(N'2024-06-25T13:26:32.0963292' AS DateTime2), CAST(N'2024-06-25T13:26:32.0963287' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (42, N'image/png', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachment7810349b-69e1-4eaa-b621-06b10530e1ab_width700_height700?alt=media&token=033a224e-2630-46cb-8e53-3f06d0c90b97', 33, CAST(N'2024-06-25T13:26:32.0963295' AS DateTime2), CAST(N'2024-06-25T13:26:32.0963294' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (43, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachmentfc25220c-8de8-4978-9fe8-f7968d995986_width1920_height1200?alt=media&token=3b8c87b3-f4ae-41ef-a1b8-3e00d3e9b83d', 33, CAST(N'2024-06-25T13:26:32.0963298' AS DateTime2), CAST(N'2024-06-25T13:26:32.0963296' AS DateTime2))
INSERT [dbo].[tblAttachments] ([Id], [Type], [FileUrl], [PostId], [CreatedAt], [ModifiedAt]) VALUES (44, N'image/jpeg', N'https://firebasestorage.googleapis.com/v0/b/fir-6ea1c.appspot.com/o/images%2Fattachmentbe3bde06-ee66-4f20-b402-dc69af0e7c4e_width3840_height2160?alt=media&token=9a64a937-9b2a-42e6-8ff6-53edf05c361f', 33, CAST(N'2024-06-25T13:26:32.0963300' AS DateTime2), CAST(N'2024-06-25T13:26:32.0963299' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblAttachments] OFF
GO
SET IDENTITY_INSERT [dbo].[tblCategories] ON 

INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (1, N'Semester 0', N'Semester of studying English at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (2, N'Semester 1', N'Semester 1 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (3, N'Semester 2', N'Semester 2 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (4, N'Semester 3', N'Semester 3 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (5, N'Semester 4', N'Semester 4 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (6, N'Semester 5', N'Semester 5 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (7, N'Semester 6', N'Semester 6 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (8, N'Semester 7', N'Semester 7 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (9, N'Semester 8', N'Semester 8 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
INSERT [dbo].[tblCategories] ([Id], [Name], [Description], [Type], [CreatedAt], [ModifiedAt]) VALUES (10, N'Semester 9', N'Semester 9 at fpt university', N'Semester', CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1200000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblCategories] OFF
GO
SET IDENTITY_INSERT [dbo].[tblComments] ON 

INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (1, N'Test', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, NULL, CAST(N'2024-06-24T21:43:36.4939509' AS DateTime2), CAST(N'2024-06-24T21:43:36.4938414' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (2, N'test 2', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, 1, CAST(N'2024-06-24T21:43:44.4945211' AS DateTime2), CAST(N'2024-06-24T21:43:44.4945201' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (3, N'test 3', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, 1, CAST(N'2024-06-24T21:44:17.0797793' AS DateTime2), CAST(N'2024-06-24T21:44:17.0797782' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (4, N'TEst 21312', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, NULL, CAST(N'2024-06-24T21:47:58.3942103' AS DateTime2), CAST(N'2024-06-24T21:47:58.3942082' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (5, N'3123123', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, 4, CAST(N'2024-06-24T21:48:04.9389390' AS DateTime2), CAST(N'2024-06-24T21:48:04.9389383' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (6, N'123123123123', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, NULL, CAST(N'2024-06-25T01:34:13.6530341' AS DateTime2), CAST(N'2024-06-25T01:34:13.6528730' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (7, N'123123', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, NULL, CAST(N'2024-06-25T01:35:03.6286054' AS DateTime2), CAST(N'2024-06-25T01:35:03.6286042' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (8, N'Hello', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, NULL, CAST(N'2024-06-25T02:40:21.9297328' AS DateTime2), CAST(N'2024-06-25T02:40:21.9297319' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (9, N'Hell', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, NULL, CAST(N'2024-06-25T02:41:28.2192802' AS DateTime2), CAST(N'2024-06-25T02:41:28.2192791' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (10, N'123', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 32, NULL, NULL, CAST(N'2024-06-25T11:38:51.2556464' AS DateTime2), CAST(N'2024-06-25T11:38:51.2554867' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (11, N'Test cc', 0, N'b5c75287-fbb8-40ef-b343-1e745c972649', 29, NULL, 1, CAST(N'2024-06-25T12:03:09.5030616' AS DateTime2), CAST(N'2024-06-25T12:03:09.5030609' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (12, N'bài viết hay tuyệt vời 🤡🤡', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 33, NULL, NULL, CAST(N'2024-06-25T13:28:33.2061854' AS DateTime2), CAST(N'2024-06-25T13:28:33.2058508' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (13, N'1', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 33, NULL, 12, CAST(N'2024-06-25T13:29:12.1523855' AS DateTime2), CAST(N'2024-06-25T13:29:12.1523619' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (14, N'Not sure what a “god endpoint” is… can you clarify?', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 34, NULL, NULL, CAST(N'2024-06-25T13:38:24.0904795' AS DateTime2), CAST(N'2024-06-25T13:38:24.0904782' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (15, N'Likely similar to "god queries" I''ve seen. You know, the ones that join 20 different tables, have a dozen sub-queries, are ridiculously non-sargable, and make you want to tear your eyeballs out just looking at them.', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 34, NULL, 14, CAST(N'2024-06-25T13:38:44.8441964' AS DateTime2), CAST(N'2024-06-25T13:38:44.8441957' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (16, N'Optimise that God endpoint''s services within reason

Leverage caching both client and server side

Leverage CDN where possible

Http compression', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 34, NULL, NULL, CAST(N'2024-06-25T13:39:05.2544797' AS DateTime2), CAST(N'2024-06-25T13:39:05.2544788' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (17, N'test
', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, 5, CAST(N'2024-06-25T13:43:16.9138074' AS DateTime2), CAST(N'2024-06-25T13:43:16.9138062' AS DateTime2))
INSERT [dbo].[tblComments] ([Id], [Content], [IsDeleted], [CreaterId], [PostId], [AttachmentId], [ReplyToId], [CreatedAt], [ModifiedAt]) VALUES (18, N'test', 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, 6, CAST(N'2024-06-25T13:43:24.4128306' AS DateTime2), CAST(N'2024-06-25T13:43:24.4128299' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblComments] OFF
GO
SET IDENTITY_INSERT [dbo].[tblDonations] ON 

INSERT [dbo].[tblDonations] ([Id], [Amount], [Message], [UserId], [CreatedAt], [ModifiedAt]) VALUES (1, 20000, N'bacnxhe172646', N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-06-25T13:32:57.6198724' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblDonations] OFF
GO
SET IDENTITY_INSERT [dbo].[tblPosts] ON 

INSERT [dbo].[tblPosts] ([Id], [Title], [Content], [IsDeleted], [TopicId], [CreaterId], [CreatedAt], [ModifiedAt]) VALUES (29, N'Lap trinh co ban voi C', N'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"C là một ngôn ngữ lập trình phổ biến nhất thế giới, là ngôn ngữ đơn giản và linh hoạt khi sử dụng. Nó là một ngôn ngữ lập trình có cấu trúc độc lập và được sử dụng rộng rãi để viết các ứng dụng, hệ điều hành như Windows và nhiều chương trình phức tạp khác như Oracle database, Git, Python Interpreter,…"}]},{"type":"paragraph","content":[{"type":"text","text":"Ngoài ra, rất nhiều lập trình viên khi "},{"type":"text","marks":[{"type":"bold"}],"text":"học lập trình C"},{"type":"text","text":" đều ví C là “ngôn ngữ mẹ”. Bởi C là cơ sở, nền tảng cho các ngôn ngữ khác và nếu lập trình viên "},{"type":"text","marks":[{"type":"bold"}],"text":"học lập trình C"},{"type":"text","text":" giỏi thì các ngôn ngữ khác như C++, C#, Java đều có thể chinh phục dễ dàng."}]}]}', 0, 4, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'2024-06-22T00:49:50.0288903' AS DateTime2), CAST(N'2024-06-22T00:49:50.0288879' AS DateTime2))
INSERT [dbo].[tblPosts] ([Id], [Title], [Content], [IsDeleted], [TopicId], [CreaterId], [CreatedAt], [ModifiedAt]) VALUES (30, N'Hello mn', N'{"type":"doc","content":[{"type":"paragraph"}]}', 0, 3, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'2024-06-22T00:55:21.7728605' AS DateTime2), CAST(N'2024-06-22T00:55:21.7728589' AS DateTime2))
INSERT [dbo].[tblPosts] ([Id], [Title], [Content], [IsDeleted], [TopicId], [CreaterId], [CreatedAt], [ModifiedAt]) VALUES (31, N'Post 1 ', N'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"123123123123123"}]}]}', 0, 1, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'2024-06-22T01:44:57.7295736' AS DateTime2), CAST(N'2024-06-22T01:44:57.7295717' AS DateTime2))
INSERT [dbo].[tblPosts] ([Id], [Title], [Content], [IsDeleted], [TopicId], [CreaterId], [CreatedAt], [ModifiedAt]) VALUES (32, N'12312312312', N'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"}]}]}', 0, 1, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'2024-06-22T21:35:03.2370673' AS DateTime2), CAST(N'2024-06-22T21:35:03.2366729' AS DateTime2))
INSERT [dbo].[tblPosts] ([Id], [Title], [Content], [IsDeleted], [TopicId], [CreaterId], [CreatedAt], [ModifiedAt]) VALUES (33, N'Lập trình cơ bản với ngôn ngữ C', N'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"sadasdlkasdddddddddksadsssssssssssssssssssssssssss"}]}]}', 0, 4, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'2024-06-25T13:26:32.0958275' AS DateTime2), CAST(N'2024-06-25T13:26:32.0955612' AS DateTime2))
INSERT [dbo].[tblPosts] ([Id], [Title], [Content], [IsDeleted], [TopicId], [CreaterId], [CreatedAt], [ModifiedAt]) VALUES (34, N'How much prevelant is this design practice?', N'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"I work in an e-commerce company and we have a god endpoint on one of our pages that provides 60-70KB response body and often takes more than half a second to complete. I am thinking of using http caching mechanism using e-tags and if-not-same headers to return 304s and optimise data transfer to client as well as UX. I wanted to know how good and prevelant this practice is. What are the things I should consider or beware of?"}]},{"type":"paragraph","content":[{"type":"text","text":"Thanks!"}]}]}', 0, 1, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'2024-06-25T13:38:12.7632459' AS DateTime2), CAST(N'2024-06-25T13:38:12.7632443' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblPosts] OFF
GO
SET IDENTITY_INSERT [dbo].[tblProfiles] ON 

INSERT [dbo].[tblProfiles] ([Id], [FirstName], [LastName], [Gender], [Major], [Bio], [Phone], [Avatar], [Banner], [UserId], [CreatedAt], [ModifiedAt]) VALUES (1, N'Bac', N'Ngo Xuan', 0, N'Software Engineering', N'', N'', N'/src/assets/images/user.png', N'', N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-06-17T22:36:22.1062252' AS DateTime2))
INSERT [dbo].[tblProfiles] ([Id], [FirstName], [LastName], [Gender], [Major], [Bio], [Phone], [Avatar], [Banner], [UserId], [CreatedAt], [ModifiedAt]) VALUES (2, N'Trong', N'BD', 0, N'Software Engineering', N'', N'', N'/src/assets/images/user.png', N'', N'b5c75287-fbb8-40ef-b343-1e745c972649', CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-06-18T15:40:39.4920339' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblProfiles] OFF
GO
INSERT [dbo].[tblRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'8fd0351d-51a4-46fe-8d45-ddb329e82c7d', N'Moderator', N'MODERATOR', NULL)
INSERT [dbo].[tblRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'ce639dfd-a954-44db-8880-9810aac3a2b6', N'Admin', N'ADMIN', NULL)
INSERT [dbo].[tblRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'fde39cc9-a7d8-4b7b-bae0-d2b5ca8946d6', N'User', N'USER', NULL)
GO
INSERT [dbo].[tblTopicCategories] ([CategoriesId], [TopicsId]) VALUES (8, 1)
INSERT [dbo].[tblTopicCategories] ([CategoriesId], [TopicsId]) VALUES (9, 2)
INSERT [dbo].[tblTopicCategories] ([CategoriesId], [TopicsId]) VALUES (6, 3)
INSERT [dbo].[tblTopicCategories] ([CategoriesId], [TopicsId]) VALUES (5, 4)
INSERT [dbo].[tblTopicCategories] ([CategoriesId], [TopicsId]) VALUES (7, 5)
INSERT [dbo].[tblTopicCategories] ([CategoriesId], [TopicsId]) VALUES (8, 6)
GO
SET IDENTITY_INSERT [dbo].[tblTopics] ON 

INSERT [dbo].[tblTopics] ([Id], [Name], [Description], [IsDeleted], [Panner], [Avatar], [CreatedAt], [ModifiedAt]) VALUES (1, N'PRJ301', N'Java Web Application Development', 0, N'', N'', CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2))
INSERT [dbo].[tblTopics] ([Id], [Name], [Description], [IsDeleted], [Panner], [Avatar], [CreatedAt], [ModifiedAt]) VALUES (2, N'SWP391', N'Software development project', 0, N'', N'', CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2))
INSERT [dbo].[tblTopics] ([Id], [Name], [Description], [IsDeleted], [Panner], [Avatar], [CreatedAt], [ModifiedAt]) VALUES (3, N'PRO192', N'Object-Oriented Programming', 0, N'', N'', CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2))
INSERT [dbo].[tblTopics] ([Id], [Name], [Description], [IsDeleted], [Panner], [Avatar], [CreatedAt], [ModifiedAt]) VALUES (4, N'PRF192', N'Programming Fundamentals', 0, N'', N'', CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2))
INSERT [dbo].[tblTopics] ([Id], [Name], [Description], [IsDeleted], [Panner], [Avatar], [CreatedAt], [ModifiedAt]) VALUES (5, N'JPD113', N'Elementary Japanese 1', 0, N'', N'', CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2))
INSERT [dbo].[tblTopics] ([Id], [Name], [Description], [IsDeleted], [Panner], [Avatar], [CreatedAt], [ModifiedAt]) VALUES (6, N'JPD123', N'Elementary Japanese 2', 0, N'', N'', CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2), CAST(N'2024-06-17T22:35:22.1300000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblTopics] OFF
GO
INSERT [dbo].[tblUserLogins] ([LoginProvider], [ProviderKey], [ProviderDisplayName], [UserId]) VALUES (N'Google', N'108313533085902899213', N'Google', N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226')
INSERT [dbo].[tblUserLogins] ([LoginProvider], [ProviderKey], [ProviderDisplayName], [UserId]) VALUES (N'Google', N'108834001800043331432', N'Google', N'b5c75287-fbb8-40ef-b343-1e745c972649')
GO
INSERT [dbo].[tblUserRoles] ([UserId], [RoleId]) VALUES (N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', N'ce639dfd-a954-44db-8880-9810aac3a2b6')
INSERT [dbo].[tblUserRoles] ([UserId], [RoleId]) VALUES (N'b5c75287-fbb8-40ef-b343-1e745c972649', N'fde39cc9-a7d8-4b7b-bae0-d2b5ca8946d6')
GO
INSERT [dbo].[tblUsers] ([Id], [RefreshToken], [RefreshTokenExpiryTime], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', N'3nxJv+Ubf+taQntLBItXoURfmRPBQrMbUbqhN81yAuy+dFcZPJUCWPaopa3tbu0q5CCDt8aeaUeNUHtm0MZ5Qg==', CAST(N'2024-07-01T22:49:39.1013320' AS DateTime2), N'bacnxhe172646', N'BACNXHE172646', N'bacnxhe172646@fpt.edu.vn', N'BACNXHE172646@FPT.EDU.VN', 1, NULL, N'ISU5QBSJHTDFKB4VBHBEC4KQE6VFJUWR', N'8043a2f8-02ff-4920-bc68-9a42b697bf59', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[tblUsers] ([Id], [RefreshToken], [RefreshTokenExpiryTime], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'b5c75287-fbb8-40ef-b343-1e745c972649', N'p2uRx30Zlmgk63zI9fr6wsFhg3Nq9z+sDkxd0LY/0NqnNGDGCq2cFxqT7Wul7D9Qrsj8cIjoBBbqn+ENHH+X5Q==', CAST(N'2024-06-25T15:40:18.2061575' AS DateTime2), N'trongbdhe173121', N'TRONGBDHE173121', N'trongbdhe173121@fpt.edu.vn', N'TRONGBDHE173121@FPT.EDU.VN', 1, NULL, N'MUREF2JKLHQFHVYUWQN4FV7S7M53USHQ', N'0741be20-ad03-485e-8866-a864d57dd80c', NULL, 0, 0, NULL, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[tblVotes] ON 

INSERT [dbo].[tblVotes] ([Id], [IsUp], [VoterId], [PostId], [CommentId], [CreatedAt], [ModifiedAt]) VALUES (28, 1, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 30, NULL, CAST(N'2024-06-24T21:26:18.1215988' AS DateTime2), CAST(N'2024-06-24T21:26:18.1215103' AS DateTime2))
INSERT [dbo].[tblVotes] ([Id], [IsUp], [VoterId], [PostId], [CommentId], [CreatedAt], [ModifiedAt]) VALUES (30, 1, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 31, NULL, CAST(N'2024-06-25T11:35:46.6434398' AS DateTime2), CAST(N'2024-06-25T11:35:46.6434392' AS DateTime2))
INSERT [dbo].[tblVotes] ([Id], [IsUp], [VoterId], [PostId], [CommentId], [CreatedAt], [ModifiedAt]) VALUES (31, 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 29, NULL, CAST(N'2024-06-25T11:44:12.9045778' AS DateTime2), CAST(N'2024-06-25T11:44:12.9045775' AS DateTime2))
INSERT [dbo].[tblVotes] ([Id], [IsUp], [VoterId], [PostId], [CommentId], [CreatedAt], [ModifiedAt]) VALUES (32, 1, N'b5c75287-fbb8-40ef-b343-1e745c972649', 29, NULL, CAST(N'2024-06-25T12:02:29.0250702' AS DateTime2), CAST(N'2024-06-25T12:02:29.0250700' AS DateTime2))
INSERT [dbo].[tblVotes] ([Id], [IsUp], [VoterId], [PostId], [CommentId], [CreatedAt], [ModifiedAt]) VALUES (33, 0, N'8c9a2a9a-5afe-4375-9ab3-efa86b1f2226', 33, NULL, CAST(N'2024-06-25T13:27:17.2084736' AS DateTime2), CAST(N'2024-06-25T13:27:17.2081776' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tblVotes] OFF
GO
/****** Object:  Index [IX_tblAttachments_PostId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblAttachments_PostId] ON [dbo].[tblAttachments]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblComments_AttachmentId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_AttachmentId] ON [dbo].[tblComments]
(
	[AttachmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblComments_CreaterId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_CreaterId] ON [dbo].[tblComments]
(
	[CreaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblComments_PostId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_PostId] ON [dbo].[tblComments]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblComments_ReplyToId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblComments_ReplyToId] ON [dbo].[tblComments]
(
	[ReplyToId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblDonations_UserId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblDonations_UserId] ON [dbo].[tblDonations]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblModerators_ModeratedTopicsId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblModerators_ModeratedTopicsId] ON [dbo].[tblModerators]
(
	[ModeratedTopicsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblPosts_CreaterId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblPosts_CreaterId] ON [dbo].[tblPosts]
(
	[CreaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblPosts_TopicId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblPosts_TopicId] ON [dbo].[tblPosts]
(
	[TopicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblProfiles_UserId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_tblProfiles_UserId] ON [dbo].[tblProfiles]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblReports_CreaterId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblReports_CreaterId] ON [dbo].[tblReports]
(
	[CreaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblRoleClaims_RoleId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblRoleClaims_RoleId] ON [dbo].[tblRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[tblRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblSavedPosts_PostId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblSavedPosts_PostId] ON [dbo].[tblSavedPosts]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblSavedPosts_UserId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblSavedPosts_UserId] ON [dbo].[tblSavedPosts]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblTopicBans_TopicId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblTopicBans_TopicId] ON [dbo].[tblTopicBans]
(
	[TopicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblTopicBans_UserId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblTopicBans_UserId] ON [dbo].[tblTopicBans]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblTopicCategories_TopicsId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblTopicCategories_TopicsId] ON [dbo].[tblTopicCategories]
(
	[TopicsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblTopics_Name]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_tblTopics_Name] ON [dbo].[tblTopics]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblUserClaims_UserId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblUserClaims_UserId] ON [dbo].[tblUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblUserLogins_UserId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblUserLogins_UserId] ON [dbo].[tblUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblUserRoles_RoleId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblUserRoles_RoleId] ON [dbo].[tblUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[tblUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[tblUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblVotes_CommentId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblVotes_CommentId] ON [dbo].[tblVotes]
(
	[CommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_tblVotes_PostId]    Script Date: 6/25/2024 2:18:10 PM ******/
CREATE NONCLUSTERED INDEX [IX_tblVotes_PostId] ON [dbo].[tblVotes]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_tblVotes_VoterId]    Script Date: 6/25/2024 2:18:10 PM ******/
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
