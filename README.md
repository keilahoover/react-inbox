#### Message Display
 [x] Users should see a list of messages with the correct styles

##### When a user views the app
 [] Then they should see a list of messages with their subjects
 [] If the message is read, it should have the read style
 [] If the message is unread, it should have the unread
 [] If the message is selected, it should have the selected style and the box should be checked
 [] If there are labels on a message, they should appear
 [] If the message is starred, then the star should be filled in, otherwise it should be empty

#### Starring
[x] Users should be able to star and unstar a message.
[x] When a user clicks the star next to a message
[x] Then it should toggle whether the message is starred or not
[x] For example if it was starred, and you clicked on it, it should be unstarred

#### Selecting Individual Messages
[x] Users should be able to select and deselect individual messages.
[x] When a user checks the checkbox on a message
[x] Then the message should be highlighted
[x] When a user unchecks the checkbox on a message
[x] Then the message should NOT be highlighted

#### Bulk Select / Deselect
[x] Users should be able to select and deselect messages.

##### Given that no messages are selected
[x] When a user checks the "Select All" checkbox
[x] Then it should check all messages (and highlight them)

##### Given that some messages are selected
[x] When a user checks the "Select All" checkbox
[x] Then it should check all messages (and highlight them)

##### Given that all messages are selected
[x] When a user unchecks the "Select All" checkbox
[x] Then it should uncheck all messages (and unhighlight them)

#### Marking Messages as Read
[x] Users should be able to mark messages as read.

##### When a user selects messages
[x] And presses "Mark As Read"
[x] Then each selected message should be marked as read
[x] And should no longer be bold

#### Marking Messages as Unread
[x] Users should be able to mark messages as unread.

##### When a user selects messages
[x] And presses "Mark As Unread"
[x] Then each selected message should be marked as unread
[x] And should should appear bold

#### Deleting Messages
[x] Users should be able to delete selected messages

##### When a user selects messages
[x] And presses "Delete" (the Trash icon)
[x] Then each selected message should be removed from the list
[x] And the unread count should update
[x] And "Select All" button should update

#### Adding Labels
[x] When a user selects messages from the sidebar
[x]And chooses a label from the "Add Label" dropdown
[x] Then that label should be added to all selected messages
[x] But if the message already contains the label then it should not be added twice
NOTE: It's OK to hard-code the list of labels

#### Removing Labels

##### When a user selects messages from the sidebar
[] And chooses a label from the "Remove Label" dropdown
[] Then that label should be removed from all of the selected messages that contain the label
NOTE: It's OK to hard-code the list of labels

NOTE: If you try to remove a label from a message that doesn't have that label, there should be no errors

#### Unread Message Count
[x] Users should always see the number of unread messages

##### When a user changes which messages are read / unread
[x] Then the unread count in the upper right-hand corner should update
[x] And when there are 0 unread messages it should display "0 unread messages"
[x] And when there is 1 unread message it should display "1 unread message"
[x] And when there's more than 1 unread message it should display "_n_ unread messages"

#### Select All Button State
[x] Users should see the state of the select all button change as messages are selected

##### When no messages are checked
[x] Then the "Select All" button should be in the "unchecked" state

##### When some messages are checked
[x] Then the "Select All" button should be in the "half-checked" state

##### When all messages are checked
[x] Then the "Select All" button should be in the "checked" state
NOTE: the "Select All" button must stay in sync at all times.

#### Select All Button State
[] Users should not be able to click on toolbar items when no messages are selected

#### Load the messages from the server
[]The messages they see should be the ones loaded from the server

### Actions should update the server-side When a user stars or unstars a message
[]reloads the page they should see that the data has been persisted

[] When a user marks messages read or unread Or deletes messages Or adds or removes labels and then refreshes the page
Then they should see that the data has been persisted

NOTE: the server-side API you are running locally runs in memory, so if you restart it, the data will reset.

#### Add the ability to compose messages
[] using a red plus button
[]And when they click that button Then a compose form should appear
[] And when they fill out the subject and body and press Send then the compose form should go away
[] And the message should appear on the page
[] And when they refresh, the message should still appear (it's persisted on the server)

[] When a user opens the compose form and then presses the red compose button then the compose form should close



#### React Router

[x] Scenario: toggling the compose form

Given I am on the root path `/`
When I click on the compose button
Then the message compose form should appear
And the route should be `/compose`

[x] Scenario: going directly to the compose route

Given I go directly to the /compose route
Then the compose form should be open
And when I click on the compose button
Then the compose form should close

[] Scenario: creating a message

Given I am on the /compose route
And I send a message
Then the compose form should close after the message is sent
The Message Show Route

[] Scenario: clicking on a message subject

Given I am on the root path `/`
When I click on the subject of a message
Then the route should change to /messages/:id
And I should see the message body expanded
And the message should be marked as read

[] Scenario: Visiting the message route directly

Given I go directly to a message route with /messages/:id
Then I should see the message body expanded
And the message should be marked as read
NOTE: the message body is not available from the /api/messages API endpoint. You'll have to make a call to the /api/messages/:id endpoint to get the body.

#### Route Interaction

[] When I open the compose form
And then click on a message
Then the compose form should close

[] And if I have opened a message
And I click on another message
Than the first message should close
