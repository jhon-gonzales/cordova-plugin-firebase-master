package org.apache.cordova.firebase;
public class Reviews {

    public String calificacion;
    public String date;

    public Reviews() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public Reviews(String calificacion, String date) {
        this.calificacion = calificacion;
        this.date = date;
    }
}