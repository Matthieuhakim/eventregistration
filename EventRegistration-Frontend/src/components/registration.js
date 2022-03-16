import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})



function PersonDto (name) {
    this.name = name
    this.events = []
  }
  
function EventDto (name, date, start, end) {
    this.name = name
    this.eventDate = date
    this.startTime = start
    this.endTime = end
}


export default {
    name: 'eventregistration',
    data () {
      return {
        persons: [],
        events: [],
        newPerson: '',
        errorPerson: '',
        newEvent: {
            name: '',
            eventDate: '2017-12-08',
            startTime: '09:00',
            endTime: '11:00'
          },
        errorEvent: '',
        response: []
      }
    },
    created: function () {
        
        AXIOS.get('/persons')
        .then(response => {
        // JSON responses are automatically parsed.
        this.persons = response.data
        })
        .catch(e => {
        this.errorPerson = e
        })
        // Initializing events
        AXIOS.get('/events')
        .then(response => {
        this.events = response.data
        })
        .catch(e => {
        this.errorEvent = e
        // this.errors.push(e)
        })
        AXIOS.get('/events')
        .then(response => {this.events = response.data})
        .catch(e => {this.errorEvent = e});
    },
    methods: {
        createPerson: function (personName) {
            AXIOS.post('/persons/'.concat(personName), {}, {})
                .then(response => {
                // JSON responses are automatically parsed.
                    this.persons.push(response.data)
                    this.errorPerson = ''
                    this.newPerson = ''
                })
                .catch(e => {
                    var errorMsg = e.response.data.message
                    console.log(errorMsg)
                    this.errorPerson = errorMsg
                })
        },

        //Not done
        createEvent: function(eventName, eventDto){

        },
        registerEvent: function (personName, eventName) {
            var indexEv = this.events.map(x => x.name).indexOf(eventName)
            var indexPart = this.persons.map(x => x.name).indexOf(personName)
            var person = this.persons[indexPart]
            var event = this.events[indexEv]
            AXIOS.post('/register', {},
              {params: {
                person: person.name,
                event: event.name}})
            .then(response => {
              // Update appropriate DTO collections
              person.events.push(event)
              this.selectedPerson = ''
              this.selectedEvent = ''
              this.errorRegistration = ''
            })
            .catch(e => {
              var errorMsg = e
              console.log(errorMsg)
              this.errorRegistration = errorMsg
            })
          }
    }
}