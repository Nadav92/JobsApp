# Jobs app
The project write with .net core + angular. <br>
Database - used SQLite. <br>
The project use Cludinary (external API) for photo service to save and managment the photos of users.
### Database
Open the database by `Ctrl + Shift + P` and choose `SqLite: open database`.<br> 
Used EF Core.<br>
Store all the information of the application.<br>
The password store by passwordHash at ASPNetUsers.<br>
AspNetRoles - table of users roles.<br>
Group- table of the groups of chat.<bt>
Likes - table of likes.<br>
Messages - table of messages. <br>
### Design Patterns
Used the Observer pattern.
## About the project
The project is social network of serach job or find employee. <br>
All the data is uplaod with the api server with `dotnet run` command if this the first run.<br>
The project contain 3 types of user - Admin, Moderator and Member. <br>
User can register to application, view users and thier details, message to other users,<br>
like / unlike user and  edit his own details. <br>
To run the project please open in integrated terminal of:
1. Backend - right click on API folder, open terminal and write `dotnet run`.
2. Front - right click on Client folder, open terminal and write `ng serve`.
## Login
User can login as Admin with <br>
Username - Admin. <br>
Password - Pa$$w0rd. <br>
User can login as Member with <br>
Usernames  - moti ,nadavBaker ,nadav ,team3 ,dor ,soroka ,matan ,ofir ,lcontrol ,shaul. <br>
Password - Pa$$w0rd.<br>
Between switch users please refresh the page.
## Functionality and Content
#### Register
Form for register new user to the application.<br>
Validation - every field with validation by the type of the field.
#### Login
User can login by username and password.
### Find Employee / Job page
The project have two diffrente types of users - Employee / Employer. <br>
Employee - write find job, and Employer - write find employee. <br>
At this page user can filter by age , employee / employer , knowan as (search input), last active and newest member. <br>
Also user can reset the filter.<br>
View to user the opposite of his type of user, the user can view user details, navigate to <br>
message page and like / unlike the user by the icons on the user card.
### Lists page
At this page user can see the user who like him or users that he like. <br>
Also  can unlike user and the user will remove from the list.
### Messages page
At this page user can view all the messages and delete from his UI, the message doesnt deleted to other user. <br>
If the other user delete the messgae also, than this messgae delete from database.<br>
By default the user navigate to unread messages, user can navigate to inbox or outbix as well.<br>
### Footer page
Contact with the author.
### About page
About the application.
### User details page
By click the user icon at card of user.<br>
At this page user can see more details about the user.<br>
The details organize by tabs:<br>
1. About - details about the user.
2. Resume - resume of the user.
3. photo - photos of user, uploaded by this user.
4. messages - user can message to other user at live by SignalR. 
### Edit profile page
By click the dropdown button (right on the screen) and click edit profile.<br>
User can update his details, Also its organize by tabs:<br>
1. General - general details of the user.
2. Resume - user can choose if he want to add resume by switch button.
3. Photo - user can add, delete, view and set other photo as main photo. every photo need to improve by the admin.
#### Admin user
This type of user can managment other users, if they can be admin / moderator / member. <br>
Also need to improve photos when member upload photo at `Admin` tab.
### Admin page - only admin can view
Login with admin user. <br>
Admin can manage other users in User managment tab and choose the role of the user: admin, moderator, member.<br>
Also admin need to improve photos of users at Photo managment tab.
### Error page - only admin can view
This page is to check all the common types of errors at the application.
### Messages - SignalR
Messages tab at the user details. can navigate directly by click message icon at find employee page.<br>
Used at SignalR technology to view live messages.<br>
Can check it by open the application in other type of explorer like edge.<br>
When user send message the receiver get toastr (note) that he have message.<br>
 By click on the note the user navigate directly to message tab and the chat will be live.<br>
 ### Photo tab - edit profile
User can add photo/s and wait untill the admin will improve the photos.<br>
The photos store in external API named Cloudinary.<br>