package org.apache.cordova.firebase;
public class Review {

    private String calificacion;
    private String comment;
    private String date;
    public Review() {
    }

    public Review(String calificacion, String date) {
        this.calificacion = calificacion;
        this.date = date;
    }

    public Review(String calificacion, String comment, String date) {
        this.calificacion = calificacion;
        this.comment = comment;
        this.date = date;
    }

    public Review(String date){
        this.date = date;
    }

    public String getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(String calificacion) {
        this.calificacion = calificacion;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}