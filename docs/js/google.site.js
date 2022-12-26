function Marker(e) {
    google.maps.Marker.apply(this, arguments), e.map_icon_label && (this.MarkerLabel = new MarkerLabel({
        map: this.map,
        marker: this,
        text: e.map_icon_label
    }), this.MarkerLabel.bindTo("position", this, "position"))
}
inherits(Marker, google.maps.Marker), Marker.prototype.setMap = function() {
    google.maps.Marker.prototype.setMap.apply(this, arguments), this.MarkerLabel && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments)
};