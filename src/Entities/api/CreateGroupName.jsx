import React,  { useState } from 'react';
import axios from 'axios';


export default function CreateGroupRoom(groupName, currentUsers) {
    let token  = localStorage.getItem('token');
    let urls = `http://127.0.0.1:8000/chat/roomg/`
    axios.post(urls,
        {
            name:  groupName,
            current_users: currentUsers},
        {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => {
            if (response.status === 200 || response.status === 201 ) {

                localStorage.setItem('requestApi', JSON.stringify(response.data));

            } else {
                console.log("Error: " + response.data.detail);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            console.log("username " + groupName);

        });

}



// class RoomGroupCreate(APIView):
//     def post(self, request):
//         current_user = request.user
//         other_user_username = request.data.get("current_users", [])

//         if not other_user_username:
//             return Response({"error": "Other user is required"}, status=status.HTTP_400_BAD_REQUEST)

//         other_user = get_user_model().objects.filter(username=other_user_username[0]).first()  # Получаем собеседника

//         if not other_user:
//             return Response({"error": "Other user not found"}, status=status.HTTP_404_NOT_FOUND)

//         # Упорядочиваем пользователей для создания уникального имени комнаты

//         room_name = request.data.get("name")

//         # Проверяем, существует ли уже комната с таким именем
//         room = Room.objects.filter(name=room_name).first()

//         if not room:
//             # Если комната не найдена, создаем новую
//             room = Room.objects.create(host=current_user)
//             room.current_users.add(current_user, other_user)  # Добавляем обоих пользователей в комнату

//             room_url = reverse("room", kwargs={"pk": room.pk})

//             return Response({
//                 "pk": room.pk,
//                 "name": room.name,
//                 "current_users": [user.username for user in room.current_users.all()],
//                 "url": room_url
//             }, status=status.HTTP_201_CREATED)
//         else:
//             # Если комната уже существует, возвращаем информацию о ней
//             room_url = reverse("room", kwargs={"pk": room.pk})

//             return Response({
//                 "pk": room.pk,
//                 "name": room.name,
//                 "current_users": [user.username for user in room.current_users.all()],
//                 "url": room_url
//             }, status=status.HTTP_200_OK)
