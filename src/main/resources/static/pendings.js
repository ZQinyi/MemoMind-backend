document.addEventListener('DOMContentLoaded', function() {
    const userId = document.getElementById('memoApp').getAttribute('data-userid');

    fetch(`/api/${userId}/pending`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 1 && data.data.length > 0) {
                data.data.forEach(invitation => {
                    const invitationDiv = document.createElement('div');
                    invitationDiv.className = 'invitation-card';
                    invitationDiv.innerHTML = `
                        <p>Invitation from userId:${invitation.inviterId} for noteId:${invitation.noteId}</p>
                        <button class="accept" onclick="handleInvitation(${invitation.invitationId}, true)">Accept</button>
                        <button class="decline" onclick="handleInvitation(${invitation.invitationId}, false)">Decline</button>
                    `;

                    document.body.appendChild(invitationDiv);
                });
            } else {
                const noInvitationDiv = document.createElement('div');
                noInvitationDiv.textContent = 'No pending invitations.';
                document.body.appendChild(noInvitationDiv);

                // BACK button
                const backButton = document.createElement('button');
                backButton.textContent = 'BACK';
                backButton.className = 'back-button';
                backButton.onclick = function() {
                    window.location.href = `/${userId}/notes`;
                };

                document.body.appendChild(backButton);
            }
        })
        .catch(error => {
            console.error('Error fetching pendings:', error);
        });
});

function handleInvitation(invitationId, accept) {
    const action = accept ? 'accept' : 'decline';
    fetch(`/api/invitations/${action}/${invitationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 可能需要添加其他headers，如认证令牌
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 1) {
                alert(`Invitation ${action}ed successfully.`);
                window.location.reload();
            } else {
                alert('Operation failed.');
            }
        })
        .catch(error => console.error(`Error ${action}ing invitation:`, error));
}












