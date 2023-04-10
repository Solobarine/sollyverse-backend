module.exports = {
  createAccount: (firstName) => {
    return `Thank you ${firstName} for opening an account with us and we hope this is the beginning of a long and beautiful partnership. We are confident that you will find our offers enticing.`
},
  updateAccount: `Hello. Your account details has been updated.`,
  updatePassword: "Hello, your password has been changed successfully.",
  createReservation: (city, country, id) => {
    return `Hello, Your reservation to tour ${city} in ${country} was successful with a reservation id of ${id}.Please ensure to come on time on the day of departure. If you wish to cancel the reservation, please do so at least a week before to the start of your tour. Thank you for choosing us and enjoy your tour.`
  },
  cancelReservation: (city, country, id) => {
    return `Hello Traveller, your reservation to ${city} in ${country} with reservation id of ${id} has been canceled. We are sorry you could not continue with your tour and we hope you will join us in the future.`
  }
}
