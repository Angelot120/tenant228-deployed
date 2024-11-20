

import React from 'react'

export default function UsersItems() {
  return (
    <div>
      <table>
        <thead>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Nom d'utilisateur</th>
          <th>Phone num</th>
          <th>Profession</th>
          <th>Voir plus</th>
        </thead>
        <tbody>
          <tr>
            <td>DOUVON</td>
            <td>Angélot</td>
            <td>angelot@gmail.com</td>
            <td>angelot</td>
            <td>00 228 90 17 43 77</td>
            <td>Profession</td>
            <td>
              <img src="#" alt="Show more" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
